import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../core/error.response";
import { IUserModel } from "../data/interfaces/user.interface";
import userRepo from "../repos/user.repo";
import {
  convertStringToObjectId,
  generateOTP,
  getInfoData,
  hashString,
} from "../utils";
import { Email } from "../utils/email";
import { SMS } from "../utils/sms";
import {
  ForgotPasswordValidator,
  LoginValidator,
  ResetPasswordValidator,
  SignUpValidator,
  VerifyCodeValidator,
} from "../validators/user.validator";
import {
  Document,
  FlattenMaps,
  ObjectId,
  StringExpression,
  Types,
} from "mongoose";
import keytokenService from "./keytoken.service";
import { createTokenPair } from "../auth/authUtils";
import crypto from "crypto";
import { IKeyTokenModel } from "../data/interfaces/keytoken.interface";

class AuthenService {
  constructor() {}

  private async getTokens(body: {
    userId: ObjectId;
    email?: string;
    mobile?: string;
    username?: string;
    role: string;
  }) {
    const keytoken = await keytokenService.createKeyToken(body.userId);

    if (!keytoken) {
      throw new UnauthorizedError("Keytoken error!");
    }
    const tokens = await createTokenPair(
      body,
      keytoken.privateKey,
      keytoken.publicKey
    );
    keytoken.refreshToken = tokens.refreshToken;
    await keytoken.save({ validateBeforeSave: false });

    return tokens;
  }

  async signUp(body: {
    mobile?: string;
    email?: string;
    name: string;
    username: string;
    password: string;
  }) {
    const { error } = SignUpValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    if (!body.mobile && !body.email) {
      throw new BadRequestError("Please fill mobile phone or email!");
    }

    if (body.mobile && body.email) {
      throw new BadRequestError("Can not fill both mobile phone and email");
    }

    if (body.mobile) {
      const checkMobileExists = await userRepo.findOneByMobileAndActiveUser(
        body.mobile
      );
      if (checkMobileExists) {
        throw new BadRequestError("Mobile existed!");
      }
    }

    if (body.email) {
      const checkEmailExists = await userRepo.findOneByEmailAndActiveUser(
        body.email
      );
      if (checkEmailExists) {
        throw new BadRequestError("Email existed!");
      }
    }

    const checkUsernameExists = await userRepo.findOneByUsernameAndActiveUser(
      body.username
    );
    if (checkUsernameExists) {
      throw new BadRequestError("Username existed!");
    }

    let newUser:
      | (Document<unknown, {}, IUserModel> &
          IUserModel &
          Required<{
            _id: unknown;
          }>)
      | null = null;
    if (body.email) {
      newUser = await userRepo.findOneByEmailAndUnverifiedUser(body.email);
    }
    if (body.mobile) {
      newUser = await userRepo.findOneByMobileAndUnverifiedUser(body.mobile);
    }
    newUser = newUser || (await userRepo.createUser(body));

    const OTP = generateOTP(6);
    const hashOTP = hashString(OTP);
    const EXPIRE_TIME = 15 * 60 * 1000;
    newUser.OTP = hashOTP;
    newUser.OTPExpires = new Date(Date.now() + EXPIRE_TIME);

    await newUser.save({ validateBeforeSave: false });
    if (body.email) {
      try {
        await new Email("OTP", body.email, OTP).sendEmail();
      } catch (err) {
        throw new InternalServerError(
          "There was an error sending the email. Try again later!"
        );
      }
    }

    if (body.mobile) {
      try {
        await new SMS("OTP", body.mobile, OTP).sendSMS();
      } catch (err) {
        throw new InternalServerError(
          "There was an error sending the SMS. Try again later!" + err
        );
      }
    }

    return {
      message: `OTP sent to your ${body.email ? "email" : "mobile phone"}!`,
    };
  }
  async forgotPassword(body: {
    mobile?: string;
    email?: string;
    username?: string;
  }) {
    const { error } = ForgotPasswordValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }
    if (!body.mobile && !body.email && !body.username) {
      throw new BadRequestError("Please fill mobile phone, email or username!");
    }
    let user:
      | (Document<unknown, {}, IUserModel> &
          IUserModel &
          Required<{
            _id: unknown;
          }>)
      | null = null;
    if (body.mobile) {
      user = await userRepo.findOneByMobileAndActiveUser(body.mobile);
      if (!user) {
        throw new BadRequestError("Mobile does not exist or is unverified!");
      }
    }

    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (!user) {
        throw new BadRequestError("Email does not exist or is unverified!");
      }
    }

    if (body.username) {
      user = await userRepo.findOneByUsernameAndActiveUser(body.username);
      if (!user) {
        throw new BadRequestError("Username does not exist or is unverified!");
      }
    }
    if (!user) {
      return {};
    }
    const EXPIRE_TIME = 10 * 60 * 1000;
    const resetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetToken = hashString(resetToken);
    const passwordResetExpires = new Date(Date.now() + EXPIRE_TIME);

    await userRepo.updatePasswordReset(
      user.id,
      passwordResetToken,
      passwordResetExpires
    );
    const URL = "http://localhost:8000/api/v1";
    const resetURL = `${URL}/resetPassword/${resetToken}`;

    if (body.email) {
      try {
        await new Email("LINK", body.email, resetURL).sendEmail();
      } catch (err) {
        throw new InternalServerError(
          "There was an error sending the email. Try again later!"
        );
      }
    }

    if (body.mobile) {
      try {
        await new SMS("LINK", body.mobile, resetURL).sendSMS();
      } catch (err) {
        throw new InternalServerError(
          "There was an error sending the SMS. Try again later!" + err
        );
      }
    }

    if (body.username) {
      if (user.email) {
        try {
          await new Email("LINK", user.email, resetURL).sendEmail();
        } catch (err) {
          throw new InternalServerError(
            "There was an error sending the email. Try again later!"
          );
        }
      } else if (user.mobile) {
        try {
          await new SMS("LINK", user.mobile, resetURL).sendSMS();
        } catch (err) {
          throw new InternalServerError(
            "There was an error sending the SMS. Try again later!" + err
          );
        }
      }
    }

    return {
      message: `Verification link sent to your ${
        body.email ? "email" : "mobile phone"
      }!`,
    };
  }
  async verifyOTP(body: { mobile?: string; email?: string; OTP: string }) {
    const { error } = VerifyCodeValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    if (!body.mobile && !body.email) {
      throw new BadRequestError("Please fill mobile phone or email!");
    }

    if (body.mobile && body.email) {
      throw new BadRequestError("Can not fill both mobile phone and email");
    }

    let user:
      | (Document<unknown, {}, IUserModel> &
          IUserModel &
          Required<{
            _id: unknown;
          }>)
      | null = null;
    if (body.mobile) {
      user = await userRepo.findOneByMobileAndActiveUser(body.mobile);
      if (user) {
        throw new BadRequestError("Mobile existed!");
      }
      user = await userRepo.findOneByMobileAndUnverifiedUser(body.mobile);
      if (!user) {
        throw new BadRequestError("User with this mobile does not exist!");
      }
    }

    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (user) {
        throw new BadRequestError("Email existed!");
      }

      user = await userRepo.findOneByEmailAndUnverifiedUser(body.email);
      if (!user) {
        throw new BadRequestError("User with this email does not exist!");
      }
    }
    if (!user) {
      return {};
    }
    if (user.OTPExpires && user.OTPExpires.getTime() < Date.now()) {
      throw new BadRequestError("OTP has expired! Please send code again!");
    }

    if (user.OTP !== hashString(body.OTP)) {
      throw new BadRequestError(
        "Your entered OTP is invalid! Please try again!"
      );
    }

    user.OTP = undefined;
    user.OTPExpires = undefined;

    await user.save({ validateBeforeSave: false });

    if (body.email) {
      await userRepo.updateUserToActiveByEmail(body.email);
    }

    if (body.mobile) {
      await userRepo.updateUserToActiveByMobile(body.mobile);
    }

    const tokens = await this.getTokens({
      userId: user.id,
      email: body.email,
      mobile: body.mobile,
      username: user.username,
      role: user.role,
    });

    return {
      user: getInfoData(user, [
        "_id",
        "email",
        "mobile",
        "username",
        "name",
        "role",
      ]),
      tokens,
    };
  }

  async logIn(body: {
    mobile?: string;
    email?: string;
    username?: string;
    password: string;
  }) {
    const { error } = LoginValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    if (!body.mobile && !body.email && !body.username) {
      throw new BadRequestError("Please fill mobile phone, email or username");
    }

    let user:
      | (Document<unknown, {}, IUserModel> &
          IUserModel &
          Required<{
            _id: unknown;
          }>)
      | null = null;
    if (body.username) {
      user = await userRepo.findOneByUsernameAndActiveUser(body.username);
      if (!user || !(await user.matchPassword(body.password))) {
        throw new BadRequestError("Username or password does not exist!");
      }
    }
    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (!user || !(await user.matchPassword(body.password))) {
        throw new BadRequestError("Email or password does not exist!");
      }
    }
    if (body.mobile) {
      user = await userRepo.findOneByMobileAndActiveUser(body.mobile);
      if (!user || !(await user.matchPassword(body.password))) {
        throw new BadRequestError("Mobile or password does not exist!");
      }
    }
    if (user) {
      const tokens = await this.getTokens({
        userId: user.id,
        email: body.email,
        mobile: body.mobile,
        username: user.username,
        role: user.role,
      });
      return {
        user: getInfoData(user, [
          "_id",
          "email",
          "mobile",
          "username",
          "name",
          "role",
        ]),
        tokens,
      };
    }

    return {};
  }

  async resetPassword(
    body: { password: string; passwordConfirm: string },
    resetToken: string
  ) {
    const { error } = ResetPasswordValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }
    const passwordResetToken = hashString(resetToken);
    const user = await userRepo.findOneByPasswordResetToken(passwordResetToken);
    if (!user) {
      throw new BadRequestError("Your token is invalid or has expired!");
    }

    if (body.password !== body.passwordConfirm) {
      throw new UnauthorizedError("Passwords does not match!");
    }

    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.password = body.password;
    user.passwordChangedAt = new Date(Date.now());
    await user.save({ validateBeforeSave: false });

    const tokens = await this.getTokens({
      userId: user.id,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      role: user.role,
    });

    return {
      user: getInfoData(user, [
        "_id",
        "email",
        "mobile",
        "username",
        "name",
        "role",
      ]),
      tokens,
    };
  }

  async logOut(
    keyStore?: FlattenMaps<IKeyTokenModel> & {
      _id: Types.ObjectId;
    }
  ) {
    if (!keyStore) {
      throw new UnauthorizedError("Not found keystore!");
    }
    const delKey = await keytokenService.removeKeyById(keyStore.id);
    console.log({ delKey });
    return {
      message: "Log out successfully!",
    };
  }
}

export default new AuthenService();

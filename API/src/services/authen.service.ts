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
import { Document, Types } from "mongoose";
import keytokenService from "./keytoken.service";
import { createTokenPair } from "../auth/authUtils";
import crypto from "crypto";
import { IKeyTokenModel } from "../data/interfaces/keytoken.interface";
import conversationRepo from "../repos/conversation.repo";
import getMessageError from "../helpers/getMessageError";
const CHATAI_ID = "668d01b84330936b4d5b427a";
class AuthenService {
  constructor() {}

  private async getTokens(body: {
    userId: Types.ObjectId;
    email?: string;
    mobile?: string;
    username?: string;
    role: string;
  }) {
    const keytoken = await keytokenService.createKeyToken(body.userId);

    if (!keytoken) {
      throw new UnauthorizedError(getMessageError(128));
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
    name?: string;
    username?: string;
    password?: string;
  }) {
    const { error } = SignUpValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    if (!body.mobile && !body.email) {
      throw new BadRequestError(getMessageError(129));
    }

    if (body.mobile && body.email) {
      throw new BadRequestError(getMessageError(130));
    }

    if (body.mobile) {
      const checkMobileExists = await userRepo.findOneByMobileAndActiveUser(
        body.mobile
      );
      if (checkMobileExists) {
        throw new BadRequestError(getMessageError(131));
      }
    }

    if (body.email) {
      const checkEmailExists = await userRepo.findOneByEmailAndActiveUser(
        body.email
      );
      if (checkEmailExists) {
        throw new BadRequestError(getMessageError(132));
      }
    }

    const checkUsernameExists = await userRepo.findOneByUsernameAndActiveUser(
      body.username as string
    );
    if (checkUsernameExists) {
      throw new BadRequestError(getMessageError(133));
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
    let isOldUser = newUser ? true : false;
    newUser =
      newUser ||
      (await userRepo.createUser({
        mobile: body.mobile,
        email: body.email,
        name: body.name as string,
        username: body.username as string,
        password: body.password as string,
      }));

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
        throw new InternalServerError(getMessageError(134));
      }
    }

    if (body.mobile) {
      try {
        await new SMS("OTP", body.mobile, OTP).sendSMS();
      } catch (err) {
        throw new InternalServerError(getMessageError(135));
      }
    }

    // testing
    if (process.env.NODE_ENV === "development") {
      if (!isOldUser) await userRepo.findByIdAndDelete(newUser.id);
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
      throw new BadRequestError(getMessageError(136));
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
        throw new BadRequestError(getMessageError(137));
      }
    }

    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (!user) {
        throw new BadRequestError(getMessageError(138));
      }
    }

    if (body.username) {
      user = await userRepo.findOneByUsernameAndActiveUser(body.username);
      if (!user) {
        throw new BadRequestError(getMessageError(139));
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
    const resetURL = `${process.env.CLIENT_DOMAIN}/resetPassword/${resetToken}`;

    if (body.email) {
      try {
        await new Email("LINK", body.email, resetURL).sendEmail();
      } catch (err) {
        throw new InternalServerError(getMessageError(134));
      }
    }

    if (body.mobile) {
      try {
        await new SMS("LINK", body.mobile, resetURL).sendSMS();
      } catch (err) {
        throw new InternalServerError(getMessageError(135));
      }
    }

    if (body.username) {
      if (user.email) {
        try {
          await new Email("LINK", user.email, resetURL).sendEmail();
        } catch (err) {
          throw new InternalServerError(getMessageError(134));
        }
      } else if (user.mobile) {
        try {
          await new SMS("LINK", user.mobile, resetURL).sendSMS();
        } catch (err) {
          throw new InternalServerError(getMessageError(135));
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
      throw new BadRequestError(getMessageError(129));
    }

    if (body.mobile && body.email) {
      throw new BadRequestError(getMessageError(130));
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
        throw new BadRequestError(getMessageError(131));
      }
      user = await userRepo.findOneByMobileAndUnverifiedUser(body.mobile);
      if (!user) {
        throw new BadRequestError(getMessageError(140));
      }
    }

    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (user) {
        throw new BadRequestError(getMessageError(132));
      }

      user = await userRepo.findOneByEmailAndUnverifiedUser(body.email);
      if (!user) {
        throw new BadRequestError(getMessageError(141));
      }
    }
    if (!user) {
      return {};
    }
    if (user.OTPExpires && user.OTPExpires.getTime() < Date.now()) {
      throw new BadRequestError(getMessageError(142));
    }

    if (user.OTP !== hashString(body.OTP)) {
      throw new BadRequestError(getMessageError(143));
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

    await conversationRepo.createConversation([
      user.id,
      convertStringToObjectId(CHATAI_ID),
    ]);

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
    password?: string;
  }) {
    const { error } = LoginValidator(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    if (!body.mobile && !body.email && !body.username) {
      throw new BadRequestError(getMessageError(144));
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
      if (!user || !(await user.matchPassword(body.password as string))) {
        throw new BadRequestError(getMessageError(145));
      }
    }
    if (body.email) {
      user = await userRepo.findOneByEmailAndActiveUser(body.email);
      if (!user || !(await user.matchPassword(body.password as string))) {
        throw new BadRequestError(getMessageError(146));
      }
    }
    if (body.mobile) {
      user = await userRepo.findOneByMobileAndActiveUser(body.mobile);
      if (!user || !(await user.matchPassword(body.password as string))) {
        throw new BadRequestError(getMessageError(147));
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
          "avatar",
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
      throw new BadRequestError(getMessageError(148));
    }

    if (body.password !== body.passwordConfirm) {
      throw new UnauthorizedError(getMessageError(149));
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
    keyStore?:
      | (Document<unknown, {}, IKeyTokenModel> &
          IKeyTokenModel &
          Required<{
            _id: unknown;
          }>)
      | null
  ) {
    if (!keyStore) {
      throw new UnauthorizedError(getMessageError(110));
    }
    const delKey = await keytokenService.removeKeyById(keyStore.id);
    console.log({ delKey });
    return {
      message: "Log out successfully!",
    };
  }
}

export default new AuthenService();

import { BadRequestError, InternalServerError } from "../core/error.response";
import { IUserModel } from "../data/interfaces/user.interface";
import userRepo from "../repos/user.repo";
import { generateOTP, getInfoData, hashString } from "../utils";
import { Email } from "../utils/email";
import { SMS } from "../utils/sms";
import {
  SignUpValidator,
  VerifyCodeValidator,
} from "../validators/user.validator";
import { Document, Types } from "mongoose";
import keytokenService from "./keytoken.service";
import { createTokenPair } from "../auth/authUtils";

const typeVerifyCode = {
  SIGN_UP: "signup",
  FORGOT_PWD: "forgotpwd",
};

class AuthenService {
  constructor() {}

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
        await new Email(body.email, OTP).sendEmail();
      } catch (err) {
        throw new InternalServerError(
          "There was an error sending the email. Try again later!"
        );
      }
    }

    if (body.mobile) {
      try {
        await new SMS(body.mobile, OTP).sendSMS();
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

  async verifyOTP(
    type: string = typeVerifyCode.SIGN_UP,
    body: { mobile?: string; email?: string; OTP: string }
  ) {
    if (!Object.values(typeVerifyCode).includes(type)) {
      throw new BadRequestError("Type is invalid!");
    }
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
      const checkMobileExists = await userRepo.findOneByMobileAndActiveUser(
        body.mobile
      );
      if (checkMobileExists) {
        throw new BadRequestError("Mobile existed!");
      }
      user = await userRepo.findOneByMobileAndUnverifiedUser(body.mobile);
      if (!user) {
        throw new BadRequestError("User with this mobile does not exist!");
      }
    }

    if (body.email) {
      const checkEmailExists = await userRepo.findOneByEmailAndActiveUser(
        body.email
      );
      if (checkEmailExists) {
        throw new BadRequestError("Email existed!");
      }

      user = await userRepo.findOneByEmailAndUnverifiedUser(body.email);
      if (!user) {
        throw new BadRequestError("User with this email does not exist!");
      }
    }
    if (user) {
      if (user.OTPExpires && user.OTPExpires.getTime() > Date.now()) {
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

      if (type === typeVerifyCode.SIGN_UP) {
        if (body.email) {
          await userRepo.updateUserToActiveByEmail(body.email);
        }

        if (body.mobile) {
          await userRepo.updateUserToActiveByMobile(body.mobile);
        }

        const newKeytoken = await keytokenService.createKeyToken(user.id);

        if (!newKeytoken) {
          throw new BadRequestError("Keytoken Error");
        }

        const { privateKey, publicKey } = newKeytoken;

        const tokens = await createTokenPair(
          {
            userId: user.id,
            email: body.email,
            mobile: body.mobile,
            role: user.role,
          },
          privateKey,
          publicKey
        );

        return {
          user: getInfoData(user, [
            "_id",
            "email",
            "mobile",
            "username",
            "name",
          ]),
          tokens,
        };
      } else if (type === typeVerifyCode.FORGOT_PWD) {
      }
    }
    return {};
  }

  logIn() {
    return "Hello";
  }
}

export default new AuthenService();

import Joi from "joi";
import { textChangeRangeNewSpan } from "typescript";
const typeVerifyCode = {
  SIGN_UP: "signup",
  FORGOT_PWD: "forgotpwd",
};

export const SignUpValidator = (data: Object) => {
  const userSchema = Joi.object({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    email: Joi.string().email(),
    name: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return userSchema.validate(data);
};

export const VerifyCodeValidator = (data: Object) => {
  const userSchema = Joi.object({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    email: Joi.string().email(),
    OTP: Joi.string().length(6).required(),
  });

  return userSchema.validate(data);
};

export const LoginValidator = (data: Object) => {
  const userSchema = Joi.object({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(3).max(20),
    password: Joi.string().min(8).max(20).required(),
  });
  return userSchema.validate(data);
};

export const ResetPasswordValidator = (data: Object) => {
  const userSchema = Joi.object({
    password: Joi.string().min(8).max(20).required(),
    passwordConfirm: Joi.string().min(8).max(20).required(),
  });
  return userSchema.validate(data);
};

export const ForgotPasswordValidator = (data: Object) => {
  const userSchema = Joi.object({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    email: Joi.string().email(),
    username: Joi.string().alphanum().min(3).max(20),
  });
  return userSchema.validate(data);
};

export const UpdateProfile = (data: Object) => {
  const userSchema = Joi.object({
    name: Joi.string(),
    username: Joi.string().alphanum().min(3).max(20),
    bio: Joi.string().max(150),
    gender: Joi.string().valid("Female", "Male", "Prefer not to say"),
    show_account_suggestions: Joi.string().valid("true", "false"),
  });
  return userSchema.validate(data);
};

export const UpdatePassword = (data: Object) => {
  const userSchema = Joi.object({
    currentPassword: Joi.string().min(8).max(20).required(),
    newPassword: Joi.string().min(8).max(20).required(),
    retypeNewPassword: Joi.string().min(8).max(20).required(),
  });
  return userSchema.validate(data);
}

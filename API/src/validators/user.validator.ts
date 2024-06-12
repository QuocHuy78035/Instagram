import Joi from "joi";

export const UserValidator = (data: Object) => {
  const userSchema = Joi.object({
    mobile: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({
        "string.pattern.base": `Phone number must have 10 digits.`,
      }),
    email: Joi.string().email(),
    fullname: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return userSchema.validate(data);
};

import { Document } from "mongoose";
interface UserInterface {
  name: string;
  username: string;
  email: string;
  mobile: string;
  avatar: string;
  status: string;
  role: string;
  gender: string;
  dateOfBirth: Date;
  password: string;
  // passwordConfirm: string | undefined;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  OTP?: string;
  OTPExpires?: Date;
}

export interface IUserModel extends UserInterface, Document {}

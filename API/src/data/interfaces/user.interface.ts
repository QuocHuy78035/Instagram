import { Document, Types } from "mongoose";
interface UserInterface {
  name: string;
  username: string;
  email?: string;
  mobile?: string;
  avatar: string;
  status: string;
  role: string;
  gender: string;
  dateOfBirth: Date;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  OTP?: string;
  OTPExpires?: Date;
  following: Array<Types.ObjectId>;
  followers: Array<Types.ObjectId>;
  modePrivate: string;
  latestOnlineAt: Date;
}

export interface IUserModel extends UserInterface, Document {
  matchPassword: (password: string) => Promise<boolean>;
}

import { Document, Types } from "mongoose";
import IStoryModel from "./story.interface";
interface UserInterface {
  name: string;
  username: string;
  email?: string;
  mobile?: string;
  avatar: string;
  status: string;
  role: string;
  bio: string;
  show_account_suggestions: boolean;
  gender: string;
  dateOfBirth: Date;
  password: string;
  passwordChangedAt: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  OTP?: string;
  OTPExpires?: Date;
  following: Array<Types.ObjectId | IUserModel>;
  followers: Array<Types.ObjectId | IUserModel>;
  modePrivate: string;
  latestOnlineAt: Date;
  createdAt: Date;
  updatedAt: Date;
  stories: IStoryModel[];
  viewed: boolean;
}

export interface IUserModel extends UserInterface, Document {
  matchPassword: (password: string) => Promise<boolean>;
}

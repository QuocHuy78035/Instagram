import { Document, Types } from "mongoose";
import { IUserModel } from "./user.interface";

interface StoryInterface {
  userId: Types.ObjectId | IUserModel;
  usersViewed: Array<Types.ObjectId | IUserModel>;
  image?: string;
  video?: string;
  text?: string;
  posted: Date;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IStoryModel extends StoryInterface, Document {}

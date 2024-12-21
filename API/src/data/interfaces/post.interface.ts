import { Document } from "mongoose";
import { IUserModel } from "./user.interface";
import { Types } from "mongoose";

interface Post {
  user: Types.ObjectId | IUserModel;
  content?: string;
  images?: Array<string>;
  videos?: Array<string>;
  likes: Array<Types.ObjectId | IUserModel>;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IPostModel extends Post, Document {

}
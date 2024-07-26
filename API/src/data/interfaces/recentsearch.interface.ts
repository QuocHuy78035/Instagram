import { Document } from "mongoose";
import { Types } from "mongoose";
import { IUserModel } from "./user.interface";

interface RecentSearchInterface {
  user: Types.ObjectId | IUserModel;
  searchedUsers: Array<Types.ObjectId | IUserModel>;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IRecentSearchModel
  extends RecentSearchInterface,
    Document {}

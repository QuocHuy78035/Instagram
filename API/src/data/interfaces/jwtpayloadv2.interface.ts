import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { IUserModel } from "./user.interface";

export default interface JwtPayloadV2 extends JwtPayload {
  userId: Types.ObjectId | IUserModel;
  email?: string;
  mobile?: string;
  username?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

import { Document, Types } from "mongoose";
import { IUserModel } from "./user.interface";

interface KeyTokenInterface {
  user: Types.ObjectId | IUserModel;
  privateKey: string;
  publicKey: string;
  refreshTokenUsed?: Array<string>;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IKeyTokenModel extends KeyTokenInterface, Document {}

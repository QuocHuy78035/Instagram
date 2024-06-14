import { Request } from "express";
import { FlattenMaps } from "mongoose";
import { IKeyTokenModel } from "./keytoken.interface";
import { Types } from "mongoose";
export default interface RequestV2 extends Request {
  keyStore?: FlattenMaps<IKeyTokenModel> & {
    _id: Types.ObjectId;
  };
  user?: {
    userId: string;
    email?: string;
    mobile?: string;
    username?: string;
    role: string;
  };
  refreshToken?: string;
}

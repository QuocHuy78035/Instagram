import { Request } from "express";
import { Document } from "mongoose";
import { IKeyTokenModel } from "./keytoken.interface";
import JwtPayloadV2 from "./jwtpayloadv2.interface";

export default interface RequestV2 extends Request {
  keyStore?: IKeyTokenModel | null;
  user?: JwtPayloadV2;
  refreshToken?: string;
}

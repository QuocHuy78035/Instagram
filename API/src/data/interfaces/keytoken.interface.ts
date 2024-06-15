import { Document, Types } from "mongoose";

interface KeyTokenInterface {
  user: Types.ObjectId;
  privateKey: string;
  publicKey: string;
  refreshTokenUsed?: Array<string>;
  refreshToken: string;
}

export interface IKeyTokenModel extends KeyTokenInterface, Document {}

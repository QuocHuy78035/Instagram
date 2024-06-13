import { Document, ObjectId } from "mongoose";

interface KeyTokenInterface {
  user: ObjectId;
  privateKey: string;
  publicKey: string;
  refreshTokenUsed?: Array<string>;
  refreshToken: string;
}

export interface IKeyTokenModel extends KeyTokenInterface, Document {}

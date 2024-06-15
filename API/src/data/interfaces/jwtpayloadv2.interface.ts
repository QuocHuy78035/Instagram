import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export default interface JwtPayloadV2 extends JwtPayload {
  userId: Types.ObjectId;
  email?: string;
  mobile?: string;
  username?: string;
  role: string;
}

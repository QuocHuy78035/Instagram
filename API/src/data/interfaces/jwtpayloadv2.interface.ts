import { JwtPayload } from "jsonwebtoken";

export default interface JwtPayloadV2 extends JwtPayload {
  userId: string;
  email?: string;
  mobile?: string;
  username?: string;
  role: string;
}

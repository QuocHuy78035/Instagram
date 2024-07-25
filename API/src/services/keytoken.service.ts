import { Types } from "mongoose";
import crypto from "crypto";
import keytokenRepo from "../repos/keytoken.repo";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import getMessageError from "../helpers/getMessageError";
export class KeyTokenService {
  constructor() {}

  async createKeyToken(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new BadRequestError(getMessageError(101));
    }
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const token = await keytokenRepo.createKeyToken(
      userId,
      privateKey,
      publicKey
    );
    return token;
  }

  async removeKeyById(id: Types.ObjectId) {
    await keytokenRepo.removeKeyById(id);
  }
}

export default new KeyTokenService();

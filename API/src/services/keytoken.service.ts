import { Types } from "mongoose";
import crypto from "crypto";
import keytokenRepo from "../repos/keytoken.repo";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
export class KeyTokenService {
  constructor() {}

  async createKeyToken(user: Types.ObjectId) {
    const checkUserExists = await userRepo.findById(user);
    if (!checkUserExists) {
      throw new BadRequestError("User does not exist!");
    }
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const token = await keytokenRepo.createKeyToken(
      user,
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

import { Types } from "mongoose";
import Keytoken from "../data/models/keytoken.model";

class KeyTokenRepo {
  constructor() {}

  async createKeyToken(
    user: Types.ObjectId,
    privateKey: string,
    publicKey: string
  ) {
    const filter = { user };
    const update = { privateKey, publicKey };
    const options = {
      new: true,
      upsert: true,
    };
    return await Keytoken.findOneAndUpdate(filter, update, options);
  }
  async findByUserId(userid: string) {
    return await Keytoken.findOne({ user: userid });
  }
  async removeKeyById(id: Types.ObjectId) {
    await Keytoken.findByIdAndDelete(id);
  }
}

export default new KeyTokenRepo();

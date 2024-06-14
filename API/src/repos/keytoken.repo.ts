import { ObjectId } from "mongoose";
import Keytoken from "../data/models/keytoken.model";

class KeyTokenRepo {
  constructor() {}

  async createKeyToken(user: ObjectId, privateKey: string, publicKey: string) {
    const filter = { user };
    const update = { privateKey, publicKey };
    const options = {
      new: true,
      upsert: true,
    };
    return await Keytoken.findOneAndUpdate(filter, update, options);
  }
  async removeKeyById(id: ObjectId) {
    await Keytoken.findByIdAndDelete(id);
  }
}

export default new KeyTokenRepo();

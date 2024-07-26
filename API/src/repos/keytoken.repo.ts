import { Types } from "mongoose";
import Keytoken from "../data/models/keytoken.model";
import { IKeyTokenModel } from "../data/interfaces/keytoken.interface";

class KeyTokenRepo {
  constructor() {}

  async createKeyToken(
    user: Types.ObjectId,
    privateKey: string,
    publicKey: string
  ): Promise<IKeyTokenModel | null> {
    const filter = { user };
    const update = { privateKey, publicKey };
    const options = {
      new: true,
      upsert: true,
    };
    return await Keytoken.findOneAndUpdate(filter, update, options);
  }
  async findByUserId(userid: string): Promise<IKeyTokenModel | null> {
    return await Keytoken.findOne({ user: userid });
  }
  async removeKeyById(id: Types.ObjectId): Promise<IKeyTokenModel | null> {
    return await Keytoken.findByIdAndDelete(id);
  }
}

export default new KeyTokenRepo();

import { Types } from "mongoose";
import Message from "../data/models/message.model";

class MessageRepo {
  constructor() {}
  async findById(id: Types.ObjectId) {
    return await Message.findById(id).populate({
      path: "senderId",
      select: { _id: 1, name: 1, username: 1, avatar: 1 },
    });
  }
  async createMessage(senderId: Types.ObjectId, message: string) {
    return await Message.create({
      senderId,
      message,
    });
  }
}

export default new MessageRepo();

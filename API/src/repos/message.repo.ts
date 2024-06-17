import { Types } from "mongoose";
import Message from "../data/models/message.model";

class MessageRepo {
  constructor() {}

  async createMessage(senderId: Types.ObjectId, message: string) {
    return await Message.create({
      senderId,
      message,
    });
  }
}

export default new MessageRepo();

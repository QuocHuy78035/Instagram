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

  async findByConversation(conversation: Types.ObjectId) {
    return await Message.find({ conversation });
  }
  async createMessage(body: {
    senderId: Types.ObjectId;
    message?: string;
    image?: string;
    replyMessage?: Types.ObjectId;
    react?: string;
    conversation: Types.ObjectId;
  }) {
    return await Message.create(body);
  }

  async deleteMessagesByConversation(conversationId: Types.ObjectId) {
    return await Message.deleteMany({ conversation: conversationId });
  }
}

export default new MessageRepo();

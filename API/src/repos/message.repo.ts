import { Types } from "mongoose";
import Message from "../data/models/message.model";
import IMessageModel from "../data/interfaces/message.interface";

class MessageRepo {
  constructor() {}
  async findById(id: Types.ObjectId): Promise<IMessageModel | null> {
    return await Message.findById(id).populate({
      path: "senderId",
      select: { _id: 1, name: 1, username: 1, avatar: 1 },
    });
  }

  async findByConversation(
    conversation: Types.ObjectId,
    page?: number
  ): Promise<Array<IMessageModel>> {
    if (!page) {
      return await Message.find({ conversation });
    }
    const perPage = 20;
    return await Message.find({ conversation })
      .populate("replyMessage")
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean();
  }
  async createMessage(body: {
    senderId: Types.ObjectId;
    message?: string;
    image?: string;
    replyMessage?: Types.ObjectId;
    react?: string;
    conversation: Types.ObjectId;
  }): Promise<IMessageModel | null> {
    return await Message.create(body);
  }

  async deleteMessagesByConversation(
    conversationId: Types.ObjectId
  ): Promise<void> {
    await Message.deleteMany({ conversation: conversationId });
  }

  async deleteMessage(messageId: Types.ObjectId): Promise<void> {
    await Message.findByIdAndDelete(messageId);
  }
}

export default new MessageRepo();

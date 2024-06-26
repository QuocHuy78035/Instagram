import { Document, Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId, messagesWithDays } from "../utils";
import { IUserModel } from "../data/interfaces/user.interface";
import messageRepo from "../repos/message.repo";

class ConversationService {
  constructor() {}

  async createConversation(userId: string, participantIds: Array<string>) {
    if (participantIds.length === 0) {
      throw new BadRequestError("Please add at least 1 participants.");
    }
    if (!participantIds.includes(userId)) {
      participantIds = [userId, ...participantIds];
    }
    const participantObjectIds: Types.ObjectId[] = await Promise.all(
      participantIds.map(async (id) => {
        if (!isValidObjectId(id)) {
          return new BadRequestError("User id is invalid!");
        }
        const user = await userRepo.findById(convertStringToObjectId(id));
        if (!user) {
          throw new BadRequestError(`User with id ${id} not found`);
        }
        return user.id;
      })
    );
    let conversation: any = await conversationRepo.createConversation(
      participantObjectIds
    );
    conversation = await conversationRepo.getConversation(conversation._id);
    conversation.participants = conversation.participants.filter(
      (participant: any) => participant._id.toString() !== userId.toString()
    );
    return { conversation };
  }

  async getConversation(userId: Types.ObjectId, conversationId: string) {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError("Conversation id is invalid!");
    }
    const conversation = await conversationRepo.findByIdAndUser(
      convertStringToObjectId(conversationId),
      userId
    );

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${conversationId} is not found!`
      );
    }
    const selectedConversation: any = await conversationRepo.getConversation(
      conversation.id
    );
    const messages = await messageRepo.findByConversation(conversation.id);
    selectedConversation.messages = messagesWithDays(messages);

    return {
      conversation: selectedConversation,
    };
  }

  async getAllConversations(userId: Types.ObjectId) {
    let conversations = await conversationRepo.getAllConversations(userId);
    if (conversations)
      conversations = conversations.map((conversation) => {
        conversation.participants = conversation.participants.filter(
          (participant) => participant._id.toString() !== userId.toString()
        );
        return conversation;
      });
    return {
      conversations,
    };
  }

  async deleteConversation(userId: Types.ObjectId, conversationId: string) {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError("Conversation id is invalid!");
    }
    const conversation = await conversationRepo.findByIdAndUser(
      convertStringToObjectId(conversationId),
      userId
    );

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${conversationId} is not found!`
      );
    }
    await messageRepo.deleteMessagesByConversation(conversation.id);
    await conversationRepo.deleteConversation(conversation.id);
  }
}

export default new ConversationService();

import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId, messagesWithDays } from "../utils";
import messageRepo from "../repos/message.repo";
import getMessageError from "../helpers/getMessageError";
import { IUserModel } from "../data/interfaces/user.interface";
import IConversationModel from "../data/interfaces/conversation.interface";
import IMessageModel from "../data/interfaces/message.interface";

class ConversationService {
  constructor() {}

  async createConversation(
    userId: string,
    participantIds: Array<string>
  ): Promise<{ conversation: IConversationModel }> {
    if (participantIds.length === 0) {
      throw new BadRequestError(getMessageError(127));
    }
    if (!participantIds.includes(userId)) {
      participantIds = [userId, ...participantIds];
    }
    const participantObjectIds: Types.ObjectId[] = await Promise.all(
      participantIds.map(async (id) => {
        if (!isValidObjectId(id)) {
          throw new BadRequestError(getMessageError(106));
        }
        const user: IUserModel | null = await userRepo.findById(
          convertStringToObjectId(id)
        );
        if (!user) {
          throw new BadRequestError(getMessageError(101));
        }
        return user.id;
      })
    );
    let conversation: IConversationModel =
      await conversationRepo.createConversation(participantObjectIds);
    conversation = (await conversationRepo.getConversation(
      conversation.id
    )) as IConversationModel;
    conversation.participants = conversation.participants.filter(
      (participant: any) => participant._id.toString() !== userId.toString()
    );
    return { conversation };
  }

  async getConversation(
    userId: Types.ObjectId,
    conversationId: string
  ): Promise<{ conversation: IConversationModel | null }> {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError(getMessageError(120));
    }
    const conversation: IConversationModel | null =
      await conversationRepo.findByIdAndUser(
        convertStringToObjectId(conversationId),
        userId
      );

    if (!conversation) {
      throw new BadRequestError(getMessageError(123));
    }
    const [selectedConversation, messages]: [
      IConversationModel | null,
      Array<IMessageModel>
    ] = await Promise.all([
      conversationRepo.getConversation(conversation.id),
      messageRepo.findByConversation(conversation.id, 1),
    ]);
    if (selectedConversation)
      selectedConversation.messages = messagesWithDays(messages);

    return {
      conversation: selectedConversation,
    };
  }

  async getAllConversations(
    userId: Types.ObjectId
  ): Promise<{ conversations: IConversationModel[] }> {
    let conversations: IConversationModel[] =
      await conversationRepo.getAllConversations(userId);
    if (conversations.length !== 0)
      conversations = conversations.map((conversation) => {
        conversation.participants = (
          conversation.participants as IUserModel[]
        ).filter(
          (participant: IUserModel) =>
            participant.id.toString() !== userId.toString()
        );
        return conversation;
      });
    return {
      conversations,
    };
  }

  async deleteConversation(userId: Types.ObjectId, conversationId: string): Promise<void> {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError(getMessageError(120));
    }
    const conversation: IConversationModel | null =
      await conversationRepo.findByIdAndUser(
        convertStringToObjectId(conversationId),
        userId
      );

    if (!conversation) {
      throw new BadRequestError(getMessageError(123));
    }
    await messageRepo.deleteMessagesByConversation(conversation.id);
    await conversationRepo.deleteConversation(conversation.id);
  }
}

export default new ConversationService();

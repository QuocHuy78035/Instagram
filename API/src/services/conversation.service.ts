import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId } from "../utils";

class ConversationService {
  constructor() {}

  async createConversation(participantIds: Array<string>) {
    const participantObjectIds = await Promise.all(
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

    const conversations = await conversationRepo.createConversation(
      participantObjectIds
    );
    return { conversations };
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

    const selectedConversation = await conversationRepo.getConversation(
      conversation.id
    );
    return {
      conversation: selectedConversation,
    };
  }
}

export default new ConversationService();

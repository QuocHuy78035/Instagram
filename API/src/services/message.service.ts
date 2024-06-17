import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId } from "../utils";
import messageRepo from "../repos/message.repo";

class MessageService {
  constructor() {}

  async sendMessage(
    userId: Types.ObjectId,
    conversationId: string,
    message: string
  ) {
    const user = await userRepo.findById(userId);

    if (!user) {
      throw new BadRequestError("User not found! Please log in again!");
    }

    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError("Conversation id is invalid!");
    }

    const conversation = await conversationRepo.findByIdAndUser(
      convertStringToObjectId(conversationId), userId
    );

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${conversationId} is not found!`
      );
    }

    const newMessage = await messageRepo.createMessage(userId, message);

    const updatedConversation = await conversationRepo.addMessageToConversation(
      conversation.id,
      newMessage.id
    );
    return {
      message: newMessage,
      conversation: updatedConversation,
    };
  }
}

export default new MessageService();

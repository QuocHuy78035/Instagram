import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId } from "../utils";
import messageRepo from "../repos/message.repo";
import SocketConnection from "../socket/socket";

class MessageService {
  constructor() {}

  async sendMessage(
    userId: Types.ObjectId,
    conversationId: string,
    message: string
  ) {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError("Conversation id is invalid!");
    }
    const [user, conversation] = await Promise.all([
      userRepo.findById(userId),
      conversationRepo.findByIdAndUser(
        convertStringToObjectId(conversationId),
        userId
      ),
    ]);

    if (!user) {
      throw new BadRequestError("User not found! Please log in again!");
    }

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${conversationId} is not found!`
      );
    }
    const newMessage = await messageRepo.createMessage(
      userId,
      message,
      conversation.id
    );
    const receivedIds = conversation.participants.filter(
      (id) => id.toString() !== userId.toString()
    );
    // Socket io
    if (receivedIds.length !== 0) {
      for (let i = 0; i < receivedIds.length; i++) {
        const receiverSocketId = SocketConnection.getReceiverSocketId(
          receivedIds[i].toString()
        );
        if (receiverSocketId) {
          SocketConnection.io
            .to(receiverSocketId)
            .emit("newMessage", newMessage);
        }
      }
    }

    return {
      message: newMessage,
      // conversation: updatedConversation,
    };
  }
}

export default new MessageService();

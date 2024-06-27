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
    console.log(Date.now());
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
    console.log(Date.now());
    const newMessage = await messageRepo.createMessage(userId, message);
    console.log(Date.now());
    const [updatedConversation, messageFromNewId] = await Promise.all([
      conversationRepo.addMessageToConversation(conversation.id, newMessage.id),
      messageRepo.findById(newMessage.id),
    ]);

    const receivedIds = updatedConversation.participants.filter(
      (id) => id.toString() !== userId.toString()
    );
    console.log(Date.now());
    // Socket io
    if (receivedIds) {
      const receiverSocketId = SocketConnection.getReceiverSocketId(
        receivedIds[0].toString()
      );
      if (receiverSocketId) {
        SocketConnection.io
          .to(receiverSocketId)
          .emit("newMessage", messageFromNewId);
      }
    }

    return {
      message: messageFromNewId,
      conversation: updatedConversation,
    };
  }
}

export default new MessageService();

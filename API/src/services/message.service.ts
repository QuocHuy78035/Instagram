import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId } from "../utils";
import messageRepo from "../repos/message.repo";
import SocketConnection from "../socket/socket";
import { UploadFiles } from "../utils/uploadFiles";

class MessageService {
  constructor() {}

  async sendMessage(body: {
    userId: Types.ObjectId;
    conversationId: string;
    message?: string;
    file?: Express.Multer.File;
    replyMessageId?: Types.ObjectId;
    react?: string;
  }) {
    if ((body.message === "" || !body.message) && !body.file) {
      throw new BadRequestError("Message and image must not be empty!");
    }
    if (body.message !== "" && body.message && body.file) {
      throw new BadRequestError(
        "Message and image can not appear at the same time!"
      );
    }
    if (!isValidObjectId(body.conversationId)) {
      throw new BadRequestError(
        `Conversation with id ${body.conversationId} is invalid!`
      );
    }
    let image: string | undefined = undefined;
    if (body.file) {
      image = await new UploadFiles(
        "messages",
        "images",
        body.file
      ).uploadFileAndDownloadURL();
    }
    let user: any = undefined;
    let conversation: any = undefined;
    let replyMessage: any = undefined;
    if (body.replyMessageId) {
      [user, conversation, replyMessage] = await Promise.all([
        userRepo.findById(body.userId),
        conversationRepo.findByIdAndUser(
          convertStringToObjectId(body.conversationId),
          body.userId
        ),
        messageRepo.findById(body.replyMessageId),
      ]);

      if (!replyMessage) {
        throw new BadRequestError(
          `Reply with ${body.replyMessageId} is not found!`
        );
      }
    } else {
      [user, conversation] = await Promise.all([
        userRepo.findById(body.userId),
        conversationRepo.findByIdAndUser(
          convertStringToObjectId(body.conversationId),
          body.userId
        ),
      ]);
    }

    if (!user) {
      throw new BadRequestError("User not found! Please log in again!");
    }

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${body.conversationId} is not found!`
      );
    }
    const newMessage = await messageRepo.createMessage({
      senderId: body.userId,
      message: body.message,
      image,
      replyMessage: body.replyMessageId,
      react: body.react,
      conversation: conversation.id,
    });
    const receivedIds = conversation.participants.filter(
      (id: any) => id.toString() !== body.userId.toString()
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

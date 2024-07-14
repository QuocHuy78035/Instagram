import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError } from "../core/error.response";
import conversationRepo from "../repos/conversation.repo";
import { convertStringToObjectId, messagesWithDays } from "../utils";
import messageRepo from "../repos/message.repo";
import SocketConnection from "../socket/socket";
import { UploadFiles } from "../utils/uploadFiles";
import resizeImage from "../utils/resizeImage";
import { answerMessage } from "../utils/chatAI";
const CHATAI_ID = "668d01b84330936b4d5b427a";
class MessageService {
  constructor() {}

  async sendMessage(body: {
    userId: Types.ObjectId;
    conversationId: string;
    message?: string;
    file?: Express.Multer.File;
    replyMessageId?: string;
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
      body.file.buffer = await resizeImage(body.file.buffer);
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
      if (!isValidObjectId(body.replyMessageId)) {
        throw new BadRequestError(
          `Reply message with id ${body.replyMessageId} is invalid!`
        );
      }
      [user, conversation, replyMessage] = await Promise.all([
        userRepo.findById(body.userId),
        conversationRepo.findByIdAndUser(
          convertStringToObjectId(body.conversationId),
          body.userId
        ),
        messageRepo.findById(convertStringToObjectId(body.replyMessageId)),
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
      replyMessage: replyMessage?.id,
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
          newMessage.replyMessage = replyMessage;
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

  async answerMessageByAI(body: {
    userId: Types.ObjectId;
    conversationId: string;
    message: string;
  }) {
    if (!isValidObjectId(body.conversationId)) {
      throw new BadRequestError(
        `Conversation with id ${body.conversationId} is invalid!`
      );
    }

    const conversation = await conversationRepo.findByIdAndUser(
      convertStringToObjectId(body.conversationId),
      body.userId
    );

    if (!conversation) {
      throw new BadRequestError(
        `Conversation with id ${body.conversationId} is not found!`
      );
    }

    if (
      !conversation.participants
        .map((participant) => participant.toString())
        .includes(CHATAI_ID)
    ) {
      throw new BadRequestError("Conversation is not for chatting with AI!");
    }

    const oldMessages = await messageRepo.findByConversation(conversation.id);

    const history = oldMessages.map((message) => {
      return {
        role: message.senderId.toString() === CHATAI_ID ? "model" : "user",
        parts: [{ text: message.message }],
      };
    });

    const message = await answerMessage(body.message, history);

    const newMessage = await messageRepo.createMessage({
      senderId: convertStringToObjectId(CHATAI_ID),
      message,
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
          // newMessage.replyMessage = replyMessage;
          SocketConnection.io
            .to(receiverSocketId)
            .emit("newMessage", newMessage);
        }
      }
    }
    return {
      message: newMessage,
    };
  }

  async findByConversation(
    userId: Types.ObjectId,
    conversationId: string,
    page: number
  ) {
    if (!isValidObjectId(conversationId)) {
      throw new BadRequestError(
        `Conversation with id ${conversationId} is invalid!`
      );
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
    const messages = messagesWithDays(
      await messageRepo.findByConversation(conversation.id, page)
    );
    return {
      messages,
    };
  }

  async deleteMessage(messageId: string) {
    if (!isValidObjectId(messageId)) {
      throw new BadRequestError(`Message with id ${messageId} is invalid!`);
    }
    const message = await messageRepo.findById(
      convertStringToObjectId(messageId)
    );
    if (!message) {
      throw new BadRequestError(`Message with id ${messageId} is not found!`);
    }
    await messageRepo.deleteMessage(message.id);
  }
}

export default new MessageService();

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
import getMessageError from "../helpers/getMessageError";
import { IUserModel } from "../data/interfaces/user.interface";
import IConversationModel from "../data/interfaces/conversation.interface";
import IMessageModel from "../data/interfaces/message.interface";
import PartialConversation from "../data/interfaces/partialconversation.interface";
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
  }): Promise<{ message: IMessageModel | null }> {
    if ((body.message === "" || !body.message) && !body.file) {
      throw new BadRequestError(getMessageError(118));
    }
    if (body.message !== "" && body.message && body.file) {
      throw new BadRequestError(getMessageError(119));
    }
    if (!isValidObjectId(body.conversationId)) {
      throw new BadRequestError(getMessageError(120));
    }

    let user: IUserModel | null = null;
    let conversation: IConversationModel | null = null;
    let replyMessage: IMessageModel | null = null;
    if (body.replyMessageId) {
      if (!isValidObjectId(body.replyMessageId)) {
        throw new BadRequestError(getMessageError(121));
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
        throw new BadRequestError(getMessageError(122));
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
      throw new BadRequestError(getMessageError(101));
    }

    if (!conversation) {
      throw new BadRequestError(getMessageError(123));
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
    const newMessage: IMessageModel | null = await messageRepo.createMessage({
      senderId: body.userId,
      message: body.message,
      image,
      replyMessage: replyMessage?.id,
      react: body.react,
      conversation: conversation.id,
    });
    const receivedIds: Types.ObjectId[] = (
      conversation.participants as Types.ObjectId[]
    ).filter((id: Types.ObjectId) => id.toString() !== body.userId.toString());
    // Socket io
    if (receivedIds.length !== 0) {
      for (let i = 0; i < receivedIds.length; i++) {
        const receiverSocketId: string = SocketConnection.getReceiverSocketId(
          receivedIds[i].toString()
        );
        if (receiverSocketId && newMessage) {
          if (replyMessage) newMessage.replyMessage = replyMessage;
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

  async answerMessageByAI(body: {
    userId: Types.ObjectId;
    conversationId: string;
    message: string;
  }): Promise<{ message: IMessageModel | null }> {
    if (!isValidObjectId(body.conversationId)) {
      throw new BadRequestError(getMessageError(120));
    }

    const conversation: IConversationModel | null =
      await conversationRepo.findByIdAndUser(
        convertStringToObjectId(body.conversationId),
        body.userId
      );

    if (!conversation) {
      throw new BadRequestError(getMessageError(123));
    }

    if (
      !conversation.participants
        .map((participant) => participant.toString())
        .includes(CHATAI_ID)
    ) {
      throw new BadRequestError(getMessageError(124));
    }

    const oldMessages: IMessageModel[] = await messageRepo.findByConversation(
      conversation.id
    );

    const history: { role: string; parts: { text: string }[] }[] =
      oldMessages.map((message: IMessageModel) => {
        return {
          role: message.senderId.toString() === CHATAI_ID ? "model" : "user",
          parts: [{ text: message.message as string }],
        };
      });

    const message: string = await answerMessage(body.message, history);

    const newMessage: IMessageModel | null = await messageRepo.createMessage({
      senderId: convertStringToObjectId(CHATAI_ID),
      message,
      conversation: conversation.id,
    });
    const receivedIds: Types.ObjectId[] = (
      conversation.participants as Types.ObjectId[]
    ).filter((id: Types.ObjectId) => id.toString() !== body.userId.toString());
    // Socket io
    if (receivedIds.length !== 0) {
      for (let i = 0; i < receivedIds.length; i++) {
        const receiverSocketId: string = SocketConnection.getReceiverSocketId(
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
  ): Promise<{
    messages: PartialConversation[];
  }> {
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
    const messages: PartialConversation[] = messagesWithDays(
      await messageRepo.findByConversation(conversation.id, page)
    );
    return {
      messages,
    };
  }

  async deleteMessage(messageId: string): Promise<void> {
    if (!isValidObjectId(messageId)) {
      throw new BadRequestError(getMessageError(125));
    }
    const message: IMessageModel | null = await messageRepo.findById(
      convertStringToObjectId(messageId)
    );
    if (!message) {
      throw new BadRequestError(getMessageError(126));
    }
    await messageRepo.deleteMessage(message.id);
  }
}

export default new MessageService();

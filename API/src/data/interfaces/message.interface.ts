import { Document } from "mongoose";
import { Types } from "mongoose";
import { IUserModel } from "./user.interface";
import IConversationModel from "./conversation.interface";

interface MessageInterface {
  senderId: Types.ObjectId | IUserModel;
  message?: string;
  image?: string;
  replyMessage?: Types.ObjectId | IMessageModel;
  react?: string;
  conversation: Types.ObjectId | IConversationModel;
  createdAt: Date;
  updatedAt: Date;
}

export default interface IMessageModel extends MessageInterface, Document {}

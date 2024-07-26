import { Document, Types } from "mongoose";
import { IUserModel } from "./user.interface";
import IMessageModel from "./message.interface";
import PartialConversation from "./partialconversation.interface";

interface ConversationInterface {
  name?: string;
  participants: Array<Types.ObjectId | IUserModel>;
  type: string;
  messages: PartialConversation[];
  createdAt: Date;
  updatedAt: Date;
}

export default interface IConversationModel
  extends ConversationInterface,
    Document {}

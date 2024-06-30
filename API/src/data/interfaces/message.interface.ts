import { Types } from "mongoose";

interface MessageInterface {
  senderId: Types.ObjectId;
  message?: string;
  image?: string;
  replyMessage?: Types.ObjectId;
  react?: string;
  conversation: Types.ObjectId;
}

export default interface IMessageModel extends MessageInterface, Document {}

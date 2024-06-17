import { Types } from "mongoose";

interface MessageInterface {
  senderId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  message: string;
}

export default interface IMessageModel extends MessageInterface, Document {}

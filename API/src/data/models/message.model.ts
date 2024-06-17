import { Schema, model } from "mongoose";
import IMessageModel from "../interfaces/message.interface";

const DOCUMENT_NAME = "Message";
const COLLECTION_NAME = "messages";

const messageSchema: Schema<IMessageModel> = new Schema<IMessageModel>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const Message = model<IMessageModel>(DOCUMENT_NAME, messageSchema);
export default Message;

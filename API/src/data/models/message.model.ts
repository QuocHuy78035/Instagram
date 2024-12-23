import { Schema, model } from "mongoose";
import IMessageModel from "../interfaces/message.interface";
import { MessageName } from "../../helpers/modelNames";

const messageSchema: Schema<IMessageModel> = new Schema<IMessageModel>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    replyMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
    react: {
      type: String,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: MessageName.COLLECTION_NAME,
  }
);

const Message = model<IMessageModel>(MessageName.DOCUMENT_NAME, messageSchema);
export default Message;

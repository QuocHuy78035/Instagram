import { Schema, model } from "mongoose";
import IConversationModel from "../interfaces/conversation.interface";

const DOCUMENT_NAME = "Conversation";
const COLLECTION_NAME = "conversations";

const conversationSchema: Schema<IConversationModel> =
  new Schema<IConversationModel>(
    {
      name: String,
      participants: {
        type: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
        ],
        default: [],
      },
      type: { type: String, default: "normal", enum: ["normal", "AI"] },
    },
    { timestamps: true, collection: COLLECTION_NAME }
  );

const Conversation = model<IConversationModel>(
  DOCUMENT_NAME,
  conversationSchema
);

export default Conversation;

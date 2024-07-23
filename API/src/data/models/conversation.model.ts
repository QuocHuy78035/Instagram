import { Schema, model } from "mongoose";
import IConversationModel from "../interfaces/conversation.interface";
import { ConversationName } from "../../utils/globalvariables";

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
    { timestamps: true, collection: ConversationName.COLLECTION_NAME }
  );

const Conversation = model<IConversationModel>(
  ConversationName.DOCUMENT_NAME,
  conversationSchema
);

export default Conversation;

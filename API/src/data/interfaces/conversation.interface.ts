import { extend } from "lodash";
import { Types } from "mongoose";

interface ConversationInterface {
  participants: Array<Types.ObjectId>;
  messages: Array<Types.ObjectId>;
}

export default interface IConversationModel
  extends ConversationInterface,
    Document {}

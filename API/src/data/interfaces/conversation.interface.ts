import { extend } from "lodash";
import { Types } from "mongoose";

interface ConversationInterface {
  name?: string;
  participants: Array<Types.ObjectId>;
}

export default interface IConversationModel
  extends ConversationInterface,
    Document {}

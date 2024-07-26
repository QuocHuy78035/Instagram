import IMessageModel from "./message.interface";

export default interface PartialConversation {
  date: string;
  fullDate: Date;
  messages: Array<IMessageModel>;
}

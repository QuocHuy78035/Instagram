import { Document, Types } from "mongoose";

interface StoryInterface {
  userId: Types.ObjectId;
  image?: string;
  video?: string;
  text?: string;
  posted: Date;
}

export default interface IStoryModel extends StoryInterface, Document {}

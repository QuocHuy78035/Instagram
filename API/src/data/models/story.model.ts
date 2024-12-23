import { Schema, model } from "mongoose";
import IStoryModel from "../interfaces/story.interface";
import { StoryName } from "../../helpers/modelNames";

const storySchema: Schema<IStoryModel> = new Schema<IStoryModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    usersViewed: {
      type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      default: [],
    },
    image: {
      type: String,
    },
    video: {
      type: String,
    },
    text: {
      type: String,
    },
    posted: Date,
  },
  {
    timestamps: true,
    collection: StoryName.COLLECTION_NAME,
  }
);
const Story = model<IStoryModel>(StoryName.DOCUMENT_NAME, storySchema);
export default Story;

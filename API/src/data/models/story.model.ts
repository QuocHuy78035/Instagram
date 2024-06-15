import { Schema, model } from "mongoose";
import IStoryModel from "../interfaces/story.interface";
import { StoryName } from "../../utils/globalvariables";

const storySchema: Schema<IStoryModel> = new Schema<IStoryModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    sharedUserIds: {
      type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      default: [],
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

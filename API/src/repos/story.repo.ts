import { Types } from "mongoose";
import Story from "../data/models/story.model";
import IStoryModel from "../data/interfaces/story.interface";
const UTF_TIME = 7 * 60 * 60 * 1000;
class StoryRepo {
  constructor() {}
  async findById(storyId: Types.ObjectId): Promise<IStoryModel | null> {
    return await Story.findById(storyId);
  }
  async createStory(
    userId: Types.ObjectId,
    image: string | undefined,
    video: string | undefined,
    text: string | undefined
  ): Promise<IStoryModel> {
    return await Story.create({
      userId,
      image,
      video,
      text,
      posted: new Date(Date.now() + UTF_TIME),
    });
  }

  async findStoriesByUser(userId: Types.ObjectId): Promise<IStoryModel[]> {
    return await Story.find({ userId });
  }
  async updateUserViewedById(
    userId: Types.ObjectId,
    storyId: Types.ObjectId
  ): Promise<IStoryModel | null> {
    return await Story.findByIdAndUpdate(
      storyId,
      {
        $addToSet: { usersViewed: userId },
      },
      { new: true }
    );
  }

  async deleteStory(storyId: Types.ObjectId): Promise<void> {
    await Story.findByIdAndDelete(storyId);
  }
}

export default new StoryRepo();

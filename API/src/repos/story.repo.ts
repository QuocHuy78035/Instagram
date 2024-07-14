import { Types } from "mongoose";
import Story from "../data/models/story.model";
const UTF_TIME = 7 * 60 * 60 * 1000;
class StoryRepo {
  constructor() {}
  async findById(storyId: Types.ObjectId) {
    return await Story.findById(storyId);
  }
  async createStory(
    userId: Types.ObjectId,
    image: string | undefined,
    video: string | undefined,
    text: string | undefined
  ) {
    return await Story.create({
      userId,
      image,
      video,
      text,
      posted: new Date(Date.now() + UTF_TIME),
    });
  }

  async findStoriesByUser(userId: Types.ObjectId) {
    return await Story.find({ userId });
  }
  async updateUserViewedById(userId: Types.ObjectId, storyId: Types.ObjectId) {
    return await Story.findByIdAndUpdate(
      storyId,
      {
        $addToSet: { usersViewed: userId },
      },
      { new: true }
    );
  }

  async deleteStory(storyId: Types.ObjectId) {
    await Story.findByIdAndDelete(storyId);
  }
}

export default new StoryRepo();

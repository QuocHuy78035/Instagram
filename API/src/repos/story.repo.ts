import { Types } from "mongoose";
import Story from "../data/models/story.model";
class StoryRepo {
  constructor() {}

  async createStory(
    userId: Types.ObjectId,
    image: string | undefined,
    video: string | undefined,
    text: string | undefined,
    sharedUserIds: Array<Types.ObjectId>
  ) {
    return await Story.create({
      userId,
      image,
      video,
      text,
      sharedUserIds,
    });
  }

  async findStoriesByUser(userId: Types.ObjectId) {
    return await Story.find({ userId });
  }
}

export default new StoryRepo();

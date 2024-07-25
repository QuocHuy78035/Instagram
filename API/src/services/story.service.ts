import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";

import storyRepo from "../repos/story.repo";
import { UploadFiles } from "../utils/uploadFiles";
import { StoryName, typesOfFile } from "../utils/globalvariables";
import { convertStringToObjectId } from "../utils";
import getMessageError from "../helpers/getMessageError";

class StoryService {
  constructor() {}

  async createStory(
    userId: Types.ObjectId,
    file: Express.Multer.File | undefined,
    text: string | undefined
  ) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!file) {
      throw new BadRequestError(getMessageError(111));
    }
    let image: string | undefined = undefined;
    let video: string | undefined = undefined;

    if (file.mimetype.startsWith("image")) {
      image = await new UploadFiles(
        StoryName.COLLECTION_NAME,
        typesOfFile.IMAGES,
        file
      ).uploadFileAndDownloadURL();
    } else if (file.mimetype.startsWith("video")) {
      video = await new UploadFiles(
        StoryName.COLLECTION_NAME,
        typesOfFile.VIDEOS,
        file
      ).uploadFileAndDownloadURL();
    }

    const story = await storyRepo.createStory(userId, image, video, text);
    return story;
  }

  async findStoriesOfOtherUser(userId: Types.ObjectId, otherUserId: string) {
    if (!isValidObjectId(otherUserId)) {
      throw new UnauthorizedError(getMessageError(102));
    }
    const otherUserObjectId: Types.ObjectId =
      convertStringToObjectId(otherUserId);

    const [user, otherUser] = await Promise.all([
      userRepo.findById(userId),
      userRepo.findById(otherUserObjectId),
    ]);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    if (!otherUser) {
      throw new UnauthorizedError(getMessageError(112));
    }

    if (userId.toString() === otherUserObjectId.toString()) {
      return await storyRepo.findStoriesByUser(userId);
    }

    if (
      (!user.following.includes(otherUserObjectId) ||
        !otherUser.followers.includes(userId)) &&
      otherUser.modePrivate === "on"
    ) {
      throw new BadRequestError(
        `${otherUser.username} is a private account! Please follow to see all stories, posts, video of ${otherUser.username}!`
      );
    }

    return await storyRepo.findStoriesByUser(otherUserObjectId);
  }

  async updateUserViewedById(userId: Types.ObjectId, storyId: string) {
    if (!isValidObjectId(storyId)) {
      throw new BadRequestError(getMessageError(113));
    }
    const story = await storyRepo.findById(convertStringToObjectId(storyId));
    if (!story) {
      throw new BadRequestError(getMessageError(114));
    }
    return { story: await storyRepo.updateUserViewedById(userId, story.id) };
  }

  async deleteStory(userId: Types.ObjectId, storyId: string) {
    if (!isValidObjectId(storyId)) {
      throw new BadRequestError(getMessageError(113));
    }
    const story = await storyRepo.findById(convertStringToObjectId(storyId));
    if (!story) {
      throw new BadRequestError(getMessageError(114));
    }

    if (!story.userId.equals(userId)) {
      throw new UnauthorizedError(getMessageError(115));
    }
    await storyRepo.deleteStory(story.id);
  }
}

export default new StoryService();

import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";

import storyRepo from "../repos/story.repo";
import { UploadFiles } from "../utils/uploadFiles";
import { StoryName, typesOfFile } from "../utils/globalvariables";
import { convertStringToObjectId } from "../utils";

class StoryService {
  constructor() {}

  async createStory(
    userId: Types.ObjectId,
    file: Express.Multer.File | undefined,
    text: string | undefined
  ) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    if (!file) {
      throw new BadRequestError("File not found!");
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
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    if (!isValidObjectId(otherUserId)) {
      throw new UnauthorizedError("Invalid followed user id");
    }
    const otherUserObjectId: Types.ObjectId =
      convertStringToObjectId(otherUserId);

    const otherUser = await userRepo.findById(otherUserObjectId);
    if (!otherUser) {
      throw new UnauthorizedError(
        `User with id ${otherUserId} not found! Please try again!`
      );
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
}

export default new StoryService();
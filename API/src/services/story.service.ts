import { Types, isValidObjectId } from "mongoose";
import userRepo from "../repos/user.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { convertStringToObjectId } from "../utils";
import storyRepo from "../repos/story.repo";
import { UploadFiles } from "../utils/uploadFiles";
import { StoryName, typesOfFile } from "../utils/globalvariables";

class StoryService {
  constructor() {}

  async createStory(
    userId: Types.ObjectId,
    file: Express.Multer.File | undefined,
    text: string | undefined,
    sharedUserIds: Array<string>
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
    const sharedUserObjectIds: Array<Types.ObjectId> = await Promise.all(
      sharedUserIds.map(async (id: string) => {
        if (!isValidObjectId(id)) {
          throw new BadRequestError("Share user id is invalid!");
        }
        const objectId: Types.ObjectId = convertStringToObjectId(id);
        const user = await userRepo.findById(objectId);
        if (!user) {
          throw new UnauthorizedError("Shared user not found!");
        }

        return objectId;
      })
    );

    const story = await storyRepo.createStory(
      userId,
      image,
      video,
      text,
      sharedUserObjectIds
    );
    return story;
  }

  async findStoriesByUser(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    return await storyRepo.findStoriesByUser(userId);
  }
}

export default new StoryService();

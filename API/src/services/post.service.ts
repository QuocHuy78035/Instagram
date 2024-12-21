import { isValidObjectId, Types } from "mongoose";
import { IUserModel } from "../data/interfaces/user.interface";
import userRepo from "../repos/user.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import getMessageError from "../helpers/getMessageError";
import { UploadFiles } from "../utils/uploadFiles";
import { PostName, typesOfFile } from "../helpers/modelNames";
import postRepo from "../repos/post.repo";
import { convertStringToObjectId } from "../utils";

class PostService {
  constructor() {}

  async createPost(
    userId: Types.ObjectId,
    content: string,
    files: Array<Express.Multer.File> | undefined
  ) {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    let images: Array<string> = [];
    let videos: Array<string> = [];
    if (files)
      await Promise.all(
        files.map(async (file) => {
          if (file.mimetype.includes("image")) {
            const image: string | undefined = await new UploadFiles(
              PostName.COLLECTION_NAME,
              typesOfFile.IMAGES,
              file
            ).uploadFileAndDownloadURL();
            if (image) images.push(image);
          } else if (file.mimetype.includes("video")) {
            const video: string | undefined = await new UploadFiles(
              PostName.COLLECTION_NAME,
              typesOfFile.IMAGES,
              file
            ).uploadFileAndDownloadURL();
            if (video) videos.push(video);
          }
        })
      );

    const newPost = await postRepo.createPost({
      user: userId,
      content,
      images,
      videos,
    });
    return {
      post: newPost,
    };
  }

  async getPosts(userId: string) {
    if (!isValidObjectId(userId)) {
      throw new BadRequestError(getMessageError(106));
    }

    const user = await userRepo.findById(convertStringToObjectId(userId));
    if (!user) {
      throw new BadRequestError(getMessageError(101));
    }

    return {
      posts: await postRepo.getPosts(convertStringToObjectId(userId))
    }
  }

  
}

export default new PostService();

import { Types } from "mongoose";
import Post from "../data/models/post.model";
import IPostModel from "../data/interfaces/post.interface";
import { removeUndefinedInObject } from "../utils";

class PostRepo {
  constructor() {}

  async createPost(body: {
    user: Types.ObjectId;
    content: string;
    images: Array<string>;
    videos: Array<string>;
  }): Promise<IPostModel> {
    return await Post.create(body);
  }
  async getPosts(userId?: Types.ObjectId) {
    const user = await Post.find(removeUndefinedInObject({ user: userId }));
    return user;
  }
}

export default new PostRepo();

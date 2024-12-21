import { model, Schema } from "mongoose";
import IPostModel from "../interfaces/post.interface";
import { PostName } from "../../helpers/modelNames";

const postSchema: Schema<IPostModel> = new Schema<IPostModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    images: {
      type: [{ type: String }],
      default: [],
    },
    videos: {
      type: [{ type: String }],
      default: [],
    },
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: PostName.COLLECTION_NAME,
  }
);

const Post = model<IPostModel>(PostName.DOCUMENT_NAME, postSchema);
export default Post;

import { model, Schema } from "mongoose";
import ICommentModel from "../interfaces/comment.interface";
import { CommentName } from "../../helpers/modelNames";

const commentSchema = new Schema<ICommentModel>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    left: {
      type: Number,
      default: 0,
    },
    right: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: CommentName.COLLECTION_NAME,
  }
);

const Comment = model<ICommentModel>(CommentName.DOCUMENT_NAME, commentSchema);

export default Comment;

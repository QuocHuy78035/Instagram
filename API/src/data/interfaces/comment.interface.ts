
import { Document, Types } from "mongoose";
import { IUserModel } from "./user.interface";
import IPostModel from "./post.interface";

interface Comment {
    post: Types.ObjectId | IPostModel;
    user: Types.ObjectId | IUserModel;
    content: string;
    parent?: Types.ObjectId | ICommentModel | null;
    left: number;
    right: number;
}

export default interface ICommentModel extends Comment, Document {}

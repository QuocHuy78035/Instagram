import { NextFunction, Request, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import { UnauthorizedError } from "../core/error.response";
import getMessageError from "../helpers/getMessageError";
import postService from "../services/post.service";
import { Types } from "mongoose";
import { CREATED, OK } from "../core/success.response";
import getMessage from "../helpers/getMessage";

class PostController {
  constructor() {}

  createPost = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const metadata = await postService.createPost(
      req.user.userId as Types.ObjectId,
      req.body.content,
      req.files as Express.Multer.File[] | undefined
    );

    new CREATED({
      message: getMessage(231),
      metadata,
    }).send(res);
  };

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    const metadata = await postService.getPosts(req.query.user as string);
    new OK({
      message: "Get posts successfully!",
      metadata,
    }).send(res);
  };
}

export default new PostController();

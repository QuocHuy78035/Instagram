import { NextFunction, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import storyService from "../services/story.service";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { CREATED, OK } from "../core/success.response";
import getMessageError from "../helpers/getMessageError";
import getMessage from "../helpers/getMessage";

class StoryController {
  constructor() {}

  createStory = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const story = await storyService.createStory(
      req.user.userId,
      req.file,
      req.body.text
    );

    new CREATED({
      message: getMessage(215),
      metadata: {
        story,
      },
    }).send(res);
  };

  findStoriesOfOtherUser = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!req.query.otherUserId) {
      throw new BadRequestError("Please fill the otherUserId query!");
    }
    if (typeof req.query.otherUserId !== "string") {
      throw new BadRequestError("The otherUserId query is invalid!");
    }
    const stories = await storyService.findStoriesOfOtherUser(
      req.user.userId,
      req.query.otherUserId
    );

    new OK({
      message: getMessage(216),
      metadata: {
        stories,
      },
    }).send(res);
  };

  updateUserViewedById = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await storyService.updateUserViewedById(
      req.user.userId,
      req.params.id
    );
    new OK({
      message: getMessage(217),
      metadata,
    }).send(res);
  };

  deleteStory = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    await storyService.deleteStory(req.user.userId, req.params.id);
    new OK({
      message: getMessage(218),
    }).send(res);
  };
}

export default new StoryController();

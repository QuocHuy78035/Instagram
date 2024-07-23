import { NextFunction, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import storyService from "../services/story.service";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { CREATED, OK } from "../core/success.response";

class StoryController {
  constructor() {}

  createStory = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const story = await storyService.createStory(
      req.user.userId,
      req.file,
      req.body.text
    );

    new CREATED({
      message: "Create story successfully!",
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
      throw new UnauthorizedError("User not found! Please log in again!");
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
      message: "Find stories by user successfully!",
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
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await storyService.updateUserViewedById(
      req.user.userId,
      req.params.id
    );
    new OK({
      message: "Update user viewed by id successfully!",
      metadata,
    }).send(res);
  };

  deleteStory = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    await storyService.deleteStory(req.user.userId, req.params.id);
    new OK({
      message: "Delete story successfully!",
    }).send(res);
  };
}

export default new StoryController();

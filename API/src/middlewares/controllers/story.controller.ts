import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import storyService from "../../services/story.service";
import { UnauthorizedError } from "../../core/error.response";
import { CREATED, OK } from "../../core/success.response";

class StoryController {
  constructor() {}

  createStory = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const story = await storyService.createStory(
      req.user.userId,
      req.file,
      req.body.text,
      req.body.sharedUserIds || []
    );

    new CREATED({
      message: "Create story successfully!",
      metadata: {
        story,
      },
    }).send(res);
  };

  findStoriesByUser = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const stories = await storyService.findStoriesByUser(req.user.userId);

    new OK({
      message: "Find stories by user successfully!",
      metadata: {
        stories,
      },
    }).send(res);
  };
}

export default new StoryController();

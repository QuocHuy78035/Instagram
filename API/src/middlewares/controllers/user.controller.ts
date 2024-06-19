import { NextFunction, Request, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import userService from "../../services/user.service";
import { UnauthorizedError } from "../../core/error.response";
import { OK } from "../../core/success.response";

class UserController {
  constructor() {}

  getUserById = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const metadata = await userService.getUserById(req.user.userId);
    new OK({
      message: "Get user successfully",
      metadata,
    }).send(res);
  };

  following = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await userService.following(
      req.user.userId,
      req.params.followedUserId
    );

    new OK({
      message: "Following user successfully!",
      metadata,
    }).send(res);
  };

  unfollowing = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await userService.unfollowing(
      req.user.userId,
      req.params.followedUserId
    );

    new OK({
      message: "Following user successfully!",
      metadata,
    }).send(res);
  };

  turnOnModePrivate = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const metadata = await userService.turnOnModePrivate(req.user.userId);
    new OK({
      message: "Turn on mode private successfully!",
      metadata,
    }).send(res);
  };

  turnOffModePrivate = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const metadata = await userService.turnOffModePrivate(req.user.userId);
    new OK({
      message: "Turn off mode private successfully!",
      metadata,
    }).send(res);
  };

  findFollowingsById = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await userService.findFollowingsById(req.user.userId);
    new OK({
      message: "Find followings successfully!",
      metadata,
    }).send(res);
  };
  searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    const metadata = await userService.searchUsers(req.query.search as string);

    new OK({
      message: "Search users successfully!",
      metadata,
    }).send(res);
  };
}
export default new UserController();

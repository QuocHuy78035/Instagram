import { NextFunction, Request, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import userService from "../services/user.service";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { OK } from "../core/success.response";
import { Types } from "mongoose";

class UserController {
  constructor() {}

  getAnotherUserByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // if (!req.user) {
    //   throw new UnauthorizedError("User not found! Please log in again!");
    // }
    if (!req.query.userId) {
      throw new BadRequestError("Query userId does not exist!");
    }
    const userId = new Types.ObjectId(req.query.userId as string);

    const metadata = await userService.getAnotherUserById(userId);
    new OK({
      message: "Get user successfully!",
      metadata,
    }).send(res);
  };

  getUserById = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const metadata = await userService.getUserById(req.user.userId);
    new OK({
      message: "Get user successfully!",
      metadata,
    }).send(res);
  };

  getUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const metadata = await userService.getUserByUserName(req.params.username);
    new OK({ message: "Get user by username successfully!", metadata }).send(
      res
    );
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
  findFollowingsByIdAndHaveStories = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    console.log("Hi" + req.user.userId);
    const metadata = await userService.findFollowingsByIdAndHaveStories(
      req.user.userId
    );
    new OK({
      message: "Find followings by user id and have stories successfully!",
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

  updateProfile = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await userService.updateProfile(
      req.user.userId,
      req.body,
      req.file
    );

    new OK({
      message: "Update profile successfully!",
      metadata,
    }).send(res);
  };

  updatePassword = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    await userService.updatePassword(req.user.userId, req.body, req.keyStore);
    new OK({
      message: "Update password successfully!",
    }).send(res);
  };
}
export default new UserController();

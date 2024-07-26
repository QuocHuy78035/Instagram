import { NextFunction, Request, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import userService from "../services/user.service";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { OK } from "../core/success.response";
import { Types } from "mongoose";
import getMessageError from "../helpers/getMessageError";
import getMessage from "../helpers/getMessage";

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
      throw new BadRequestError(getMessageError(153));
    }
    const userId = new Types.ObjectId(req.query.userId as string);

    const metadata = await userService.getAnotherUserById(userId);
    new OK({
      message: getMessage(219),
      metadata,
    }).send(res);
  };

  getUserById = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const metadata = await userService.getUserById(
      req.user.userId as Types.ObjectId
    );
    new OK({
      message: getMessage(219),
      metadata,
    }).send(res);
  };

  getUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const metadata = await userService.getUserByUserName(req.params.username);
    new OK({ message: getMessage(220), metadata }).send(res);
  };

  following = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await userService.following(
      req.user.userId as Types.ObjectId,
      req.params.followedUserId
    );

    new OK({
      message: getMessage(221),
      metadata,
    }).send(res);
  };

  unfollowing = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await userService.unfollowing(
      req.user.userId as Types.ObjectId,
      req.params.followedUserId
    );

    new OK({
      message: getMessage(222),
      metadata,
    }).send(res);
  };

  turnOnModePrivate = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const metadata = await userService.turnOnModePrivate(
      req.user.userId as Types.ObjectId
    );
    new OK({
      message: getMessage(223),
      metadata,
    }).send(res);
  };

  turnOffModePrivate = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const metadata = await userService.turnOffModePrivate(
      req.user.userId as Types.ObjectId
    );
    new OK({
      message: getMessage(224),
      metadata,
    }).send(res);
  };

  findFollowingsById = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await userService.findFollowingsById(
      req.user.userId as Types.ObjectId
    );
    new OK({
      message: getMessage(225),
      metadata,
    }).send(res);
  };
  findFollowingsByIdAndHaveStories = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await userService.findFollowingsByIdAndHaveStories(
      req.user.userId as Types.ObjectId
    );
    new OK({
      message: getMessage(226),
      metadata,
    }).send(res);
  };
  searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    const metadata = await userService.searchUsers(req.query.search as string);

    new OK({
      message: getMessage(227),
      metadata,
    }).send(res);
  };

  updateProfile = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await userService.updateProfile(
      req.user.userId as Types.ObjectId,
      req.body,
      req.file
    );

    new OK({
      message: getMessage(228),
      metadata,
    }).send(res);
  };

  updatePassword = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    await userService.updatePassword(
      req.user.userId as Types.ObjectId,
      req.body,
      req.keyStore
    );
    new OK({
      message: getMessage(229),
    }).send(res);
  };
}
export default new UserController();

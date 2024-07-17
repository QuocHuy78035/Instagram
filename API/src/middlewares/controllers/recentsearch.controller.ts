import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import recentsearchService from "../../services/recentsearch.service";
import { UnauthorizedError } from "../../core/error.response";
import { OK } from "../../core/success.response";

class RecentSearchController {
  constructor() {}
  findRecentSearchByUser = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await recentsearchService.findRecentSearchByUser(
      req.user?.userId
    );
    new OK({
      message: "Find recent search by user successfully!",
      metadata,
    }).send(res);
  };
  removeSearchedUserFromRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata =
      await recentsearchService.removeSearchedUserFromRecentSearch(
        req.user.userId,
        req.params.searchUser
      );

    new OK({
      message: "Remove searched user from recent search successfully!",
      metadata,
    }).send(res);
  };
  removeAllSearchedUsersFromRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata =
      await recentsearchService.removeAllSearchedUsersFromRecentSearch(
        req.user.userId
      );
    new OK({
      message: "Remove all searched users from recent search successfully!",
      metadata,
    }).send(res);
  };

  addSearchedUserToRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await recentsearchService.addSearchedUserToRecentSearch(
      req.user.userId,
      req.params.searchedUser
    );
    new OK({
      message: "Add searched user to recent search successfully!",
      metadata,
    }).send(res);
  };
}

export default new RecentSearchController();

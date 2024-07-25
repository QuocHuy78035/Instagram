import { NextFunction, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import recentsearchService from "../services/recentsearch.service";
import { UnauthorizedError } from "../core/error.response";
import { OK } from "../core/success.response";
import getMessageError from "../helpers/getMessageError";
import getMessage from "../helpers/getMessage";

class RecentSearchController {
  constructor() {}
  findRecentSearchByUser = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await recentsearchService.findRecentSearchByUser(
      req.user?.userId
    );
    new OK({
      message: getMessage(211),
      metadata,
    }).send(res);
  };
  removeSearchedUserFromRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata =
      await recentsearchService.removeSearchedUserFromRecentSearch(
        req.user.userId,
        req.params.searchedUser
      );

    new OK({
      message: getMessage(212),
      metadata,
    }).send(res);
  };
  removeAllSearchedUsersFromRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata =
      await recentsearchService.removeAllSearchedUsersFromRecentSearch(
        req.user.userId
      );
    new OK({
      message: getMessage(213),
      metadata,
    }).send(res);
  };

  addSearchedUserToRecentSearch = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await recentsearchService.addSearchedUserToRecentSearch(
      req.user.userId,
      req.params.searchedUser
    );
    new OK({
      message: getMessage(214),
      metadata,
    }).send(res);
  };
}

export default new RecentSearchController();

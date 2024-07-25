import { isValidObjectId, Types } from "mongoose";
import recentsearchRepo from "../repos/recentsearch.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId } from "../utils";
import getMessageError from "../helpers/getMessageError";

class RecentSearchService {
  constructor() {}
  async findRecentSearchByUser(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    let recentSearch = await recentsearchRepo.findRecentSearchByUser(userId);
    if (!recentSearch) {
      recentSearch = await recentsearchRepo.createRecentSearch(userId);
    }
    return {
      recentSearch,
    };
  }

  async removeSearchedUserFromRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: string
  ) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError(getMessageError(116));
    }
    const searchedUser = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(getMessageError(117));
    }

    const recentSearch =
      await recentsearchRepo.removeSearchedUserFromRecentSearch(
        userId,
        searchedUser.id
      );
    return {
      recentSearch,
    };
  }
  async addSearchedUserToRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: string
  ) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError(getMessageError(116));
    }
    const searchedUser = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(getMessageError(117));
    }
    const recentSearch = await recentsearchRepo.addSearchedUserToRecentSearch(
      userId,
      searchedUser.id
    );
    return {
      recentSearch,
    };
  }
  async removeAllSearchedUsersFromRecentSearch(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const recentSearch =
      await recentsearchRepo.removeAllSearchedUsersFromRecentSearch(userId);
    return {
      recentSearch,
    };
  }
}

export default new RecentSearchService();

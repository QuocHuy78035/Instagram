import { isValidObjectId, Types } from "mongoose";
import recentsearchRepo from "../repos/recentsearch.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId } from "../utils";

class RecentSearchService {
  constructor() {}
  async findRecentSearchByUser(userId: Types.ObjectId) {
    const recentSearch = await recentsearchRepo.findRecentSearchByUser(userId);
    return {
      recentSearch,
    };
  }

  async removeSearchedUserFromRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: string
  ) {
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError("Invalid searched user id");
    }
    const searchedUser = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(`User with id ${searchedUserId} is not found!`);
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
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError("Invalid searched user id");
    }
    const searchedUser = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(`User with id ${searchedUserId} is not found!`);
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
    const recentSearch =
      await recentsearchRepo.removeAllSearchedUsersFromRecentSearch(userId);
    return {
      recentSearch,
    };
  }
}

export default new RecentSearchService();

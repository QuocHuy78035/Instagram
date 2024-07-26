import { isValidObjectId, Types } from "mongoose";
import recentsearchRepo from "../repos/recentsearch.repo";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId } from "../utils";
import getMessageError from "../helpers/getMessageError";
import { IUserModel } from "../data/interfaces/user.interface";
import IRecentSearchModel from "../data/interfaces/recentsearch.interface";

class RecentSearchService {
  constructor() {}
  async findRecentSearchByUser(
    userId: Types.ObjectId
  ): Promise<{ recentSearch: IRecentSearchModel }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    let recentSearch: IRecentSearchModel | null =
      await recentsearchRepo.findRecentSearchByUser(userId);
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
  ): Promise<{
    recentSearch: IRecentSearchModel | null;
  }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError(getMessageError(116));
    }
    const searchedUser: IUserModel | null = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(getMessageError(117));
    }

    const recentSearch: IRecentSearchModel | null =
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
  ): Promise<{ recentSearch: IRecentSearchModel | null }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!isValidObjectId(searchedUserId)) {
      throw new UnauthorizedError(getMessageError(116));
    }
    const searchedUser: IUserModel | null = await userRepo.findById(
      convertStringToObjectId(searchedUserId)
    );
    if (!searchedUser) {
      throw new BadRequestError(getMessageError(117));
    }
    const recentSearch: IRecentSearchModel | null =
      await recentsearchRepo.addSearchedUserToRecentSearch(
        userId,
        searchedUser.id
      );
    return {
      recentSearch,
    };
  }
  async removeAllSearchedUsersFromRecentSearch(
    userId: Types.ObjectId
  ): Promise<{ recentSearch: IRecentSearchModel | null }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const recentSearch: IRecentSearchModel | null =
      await recentsearchRepo.removeAllSearchedUsersFromRecentSearch(userId);
    return {
      recentSearch,
    };
  }
}

export default new RecentSearchService();

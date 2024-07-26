import { Types } from "mongoose";
import RecentSearch from "../data/models/recentsearch.model";
import { Type } from "typescript";
import IRecentSearchModel from "../data/interfaces/recentsearch.interface";

class RecentSearchRepo {
  constructor() {}
  async findRecentSearchByUser(
    user: Types.ObjectId
  ): Promise<IRecentSearchModel | null> {
    return await RecentSearch.findOne({ user }).populate({
      path: "searchedUsers",
      select: {
        _id: 1,
        username: 1,
        name: 1,
        avatar: 1,
      },
    });
  }
  async removeSearchedUserFromRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: Types.ObjectId
  ): Promise<IRecentSearchModel | null> {
    return await RecentSearch.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          searchedUsers: searchedUserId,
        },
      },
      { new: true }
    ).populate({
      path: "searchedUsers",
      select: {
        _id: 1,
        username: 1,
        name: 1,
        avatar: 1,
      },
    });
  }

  async removeAllSearchedUsersFromRecentSearch(
    userId: Types.ObjectId
  ): Promise<IRecentSearchModel | null> {
    return await RecentSearch.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          searchedUsers: [],
        },
      },
      { new: true }
    ).populate({
      path: "searchedUsers",
      select: {
        _id: 1,
        username: 1,
        name: 1,
        avatar: 1,
      },
    });
  }

  async addSearchedUserToRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: Types.ObjectId
  ): Promise<IRecentSearchModel | null> {
    return await RecentSearch.findOneAndUpdate(
      { user: userId },
      {
        $addToSet: {
          searchedUsers: searchedUserId,
        },
      },
      { new: true, upsert: true }
    ).populate({
      path: "searchedUsers",
      select: {
        _id: 1,
        username: 1,
        name: 1,
        avatar: 1,
      },
    });
  }

  async findSearchUserInRecentSearch(
    userId: Types.ObjectId,
    searchedUserId: Types.ObjectId
  ): Promise<IRecentSearchModel | null> {
    return await RecentSearch.findOne(
      { user: userId },
      {
        searchedUsers: { $elemMatch: { _id: searchedUserId } },
      }
    );
  }

  async createRecentSearch(
    userId: Types.ObjectId
  ): Promise<IRecentSearchModel> {
    return await RecentSearch.create({ user: userId });
  }
}
export default new RecentSearchRepo();

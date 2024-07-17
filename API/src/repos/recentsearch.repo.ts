import { Types } from "mongoose";
import RecentSearch from "../data/models/recentsearch.model";

class RecentSearchRepo {
  constructor() {}
  async findRecentSearchByUser(user: Types.ObjectId) {
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
  ) {
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

  async removeAllSearchedUsersFromRecentSearch(userId: Types.ObjectId) {
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
  ) {
    return await RecentSearch.findOneAndUpdate(
      { user: userId },
      {
        $push: {
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
}
export default new RecentSearchRepo();

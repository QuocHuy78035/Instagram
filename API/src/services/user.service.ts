import { Types, isValidObjectId } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId, getInfoData } from "../utils";
import { fetchSearchURL } from "../utils/searchElastic";
import storyRepo from "../repos/story.repo";

class UserService {
  constructor() {}
  async getUserById(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);

    return {
      user,
    };
  }

  async following(userId: Types.ObjectId, followedUserId: string) {
    if (!isValidObjectId(followedUserId)) {
      throw new UnauthorizedError("Invalid followed user id");
    }
    const followedUserObjectId: Types.ObjectId =
      convertStringToObjectId(followedUserId);

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const followedUser = await userRepo.findById(followedUserObjectId);
    if (!followedUser) {
      throw new UnauthorizedError("Followed user not found! Please try again!");
    }

    const updatedUser = await userRepo.updateAddToFollowingById(
      userId,
      followedUserObjectId
    );
    const updatedFollowedUser = await userRepo.updateAddToFollowersById(
      userId,
      followedUserObjectId
    );

    return {
      user: getInfoData(updatedUser, ["_id", "username", "following"]),
    };
  }

  async unfollowing(userId: Types.ObjectId, followedUserId: string) {
    if (!isValidObjectId(followedUserId)) {
      throw new UnauthorizedError("Invalid followed user id");
    }
    const followedUserObjectId: Types.ObjectId =
      convertStringToObjectId(followedUserId);

    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const followedUser = await userRepo.findById(followedUserObjectId);
    if (!followedUser) {
      throw new UnauthorizedError("Followed user not found! Please try again!");
    }

    const updatedUser = await userRepo.updateRemoveFromFollowingById(
      userId,
      followedUserObjectId
    );
    const updatedFollowedUser = await userRepo.updateRemoveFromFollowersById(
      userId,
      followedUserObjectId
    );

    return {
      user: getInfoData(updatedUser, ["_id", "username", "following"]),
    };
  }

  async turnOnModePrivate(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const updatedUser = await userRepo.updateModePrivateToOnById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "username", "modePrivate"]),
    };
  }
  async turnOffModePrivate(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const updatedUser = await userRepo.updateModePrivateToOffById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "username", "modePrivate"]),
    };
  }

  async findFollowingsById(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const followings = await userRepo.findFollowingsById(userId);
    return {
      followings,
    };
  }

  async findFollowingsByIdAndHaveStories(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    let followings: Array<any> | undefined = await userRepo.findFollowingsById(
      userId
    );
    if (!followings) {
      throw new BadRequestError("Following is not found!");
    }
    followings = await Promise.all(
      followings.map(async function (following: any) {
        following.stories = await storyRepo.findStoriesByUser(following._id);

        return following;
      })
    );
    // have story
    followings = followings.filter(
      (following) => following.stories.length !== 0
    );
    followings = followings.map((following) => {
      const viewed: boolean = Boolean(
        following.stories.find((story: any) => {
          return story.usersViewed.includes(userId);
        })
      );
      following.viewed = viewed;
      return following;
    });
    return {
      followings,
    };
  }

  async searchUsers(search: string = "") {
    const users = await userRepo.searchUsers(search);
    if (users.length === 0) {
      throw new BadRequestError("No results found!");
    }

    return {
      users: users.map((user) =>
        getInfoData(user, ["_id", "username", "name", "avatar"])
      ),
    };
  }
  async updateLatestOnlineAt(userId: string) {
    if (!isValidObjectId(userId)) {
      throw new UnauthorizedError("Invalid user id");
    }
    const user = await userRepo.findById(convertStringToObjectId(userId));
    if (!user) {
      throw new BadRequestError(`User with id ${userId} is not found!`);
    }

    return await userRepo.updateLatestOnlineAt(user.id);
  }
}

export default new UserService();

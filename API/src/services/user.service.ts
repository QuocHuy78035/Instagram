import { Types, isValidObjectId } from "mongoose";
import { UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId, getInfoData } from "../utils";

class UserService {
  constructor() {}

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
      user: getInfoData(updatedUser, ["_id", "following"]),
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
      user: getInfoData(updatedUser, ["_id", "following"]),
    };
  }

  async turnOnModePrivate(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const updatedUser = await userRepo.updateModePrivateToOnById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "modePrivate"]),
    };
  }
  async turnOffModePrivate(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    const updatedUser = await userRepo.updateModePrivateToOffById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "modePrivate"]),
    };
  }
}

export default new UserService();

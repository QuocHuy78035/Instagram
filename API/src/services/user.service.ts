import { Document, Types, isValidObjectId } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId, getInfoData } from "../utils";
import storyRepo from "../repos/story.repo";
import { UploadFiles } from "../utils/uploadFiles";
import { UpdatePassword } from "../validators/user.validator";
import { IKeyTokenModel } from "../data/interfaces/keytoken.interface";
import keytokenService from "./keytoken.service";

class UserService {
  constructor() {}

  async getAnotherUserById(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    return {
      user,
    };
  }

  async getUserById(userId: Types.ObjectId) {
    const user = await userRepo.findById(userId);
    return {
      user,
    };
  }

  async getUserByUserName(username: string) {
    const user = await userRepo.findByUsername(username);
    if (!user) {
      throw new BadRequestError("User not found");
    }
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

    const viewedFollowings: Array<any> = [];
    const unviewedFollowings: Array<any> = [];
    for (let i = 0; i < followings.length; i++) {
      if (followings[i].viewed) {
        viewedFollowings.push(followings[i]);
      } else {
        unviewedFollowings.push(followings[i]);
      }
    }
    followings = [...unviewedFollowings, ...viewedFollowings];
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

  async updateProfile(
    userId: Types.ObjectId,
    body: {
      name?: string;
      username?: string;
      bio?: string;
      gender?: string;
      show_account_suggestions?: string;
    },
    file?: Express.Multer.File
  ) {
    let avatar: string | undefined = undefined;
    if (file) {
      avatar = await new UploadFiles(
        "messages",
        "images",
        file
      ).uploadFileAndDownloadURL();
    }
    const user = await userRepo.updateProfile(userId, {
      ...body,
      avatar,
      show_account_suggestions: Boolean(body.show_account_suggestions),
    });
    return {
      user,
    };
  }

  async updatePassword(
    userId: Types.ObjectId,
    body: {
      currentPassword: string;
      newPassword: string;
      retypeNewPassword: string;
    },
    keyStore?:
      | (Document<unknown, {}, IKeyTokenModel> &
          IKeyTokenModel &
          Required<{
            _id: unknown;
          }>)
      | null
  ) {
    const { error } = UpdatePassword(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user = await userRepo.findByIdWithPassword(userId);
    if (!user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }

    if (!(await user.matchPassword(body.currentPassword))) {
      throw new BadRequestError(
        "Current password is not correct! Please try again!"
      );
    }

    if (body.currentPassword === body.newPassword) {
      throw new BadRequestError(
        "Current password and new password must not be the same! Please try again!"
      );
    }

    if (body.newPassword !== body.retypeNewPassword) {
      throw new BadRequestError(
        "New password and retype new password must be the same! Please try again!"
      );
    }

    user.password = body.newPassword;
    await user.save({ validateBeforeSave: true });

    //logout
    if (!keyStore) {
      throw new UnauthorizedError("Not found keystore!");
    }
    const delKey = await keytokenService.removeKeyById(keyStore.id);
    return {};
  }
}

export default new UserService();

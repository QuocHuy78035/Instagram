import { Document, Types, isValidObjectId } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import userRepo from "../repos/user.repo";
import { convertStringToObjectId, getInfoData } from "../utils";
import storyRepo from "../repos/story.repo";
import { UploadFiles } from "../utils/uploadFiles";
import { UpdatePassword } from "../validators/user.validator";
import { IKeyTokenModel } from "../data/interfaces/keytoken.interface";
import keytokenService from "./keytoken.service";
import getMessageError from "../helpers/getMessageError";
import { IUserModel } from "../data/interfaces/user.interface";
import IStoryModel from "../data/interfaces/story.interface";

class UserService {
  constructor() {}

  async getAnotherUserById(
    userId: Types.ObjectId
  ): Promise<{ user: IUserModel | null }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    return {
      user,
    };
  }

  async getUserById(
    userId: Types.ObjectId
  ): Promise<{ user: IUserModel | null }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    return {
      user,
    };
  }

  async getUserByUserName(
    username: string
  ): Promise<{ user: IUserModel | null }> {
    const user: IUserModel | null = await userRepo.findByUsername(username);
    if (!user) {
      throw new BadRequestError(getMessageError(101));
    }
    return {
      user,
    };
  }

  async following(
    userId: Types.ObjectId,
    followedUserId: string
  ): Promise<{
    user: { _id: string; username: string; following: Array<string> };
  }> {
    if (!isValidObjectId(followedUserId)) {
      throw new UnauthorizedError(getMessageError(102));
    }
    const followedUserObjectId: Types.ObjectId =
      convertStringToObjectId(followedUserId);

    const [user, followedUser]: [IUserModel | null, IUserModel | null] =
      await Promise.all([
        userRepo.findById(userId),
        userRepo.findById(followedUserObjectId),
      ]);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!followedUser) {
      throw new UnauthorizedError(getMessageError(103));
    }

    const [updatedUser, _]: [IUserModel | null, IUserModel | null] =
      await Promise.all([
        userRepo.updateAddToFollowingById(userId, followedUserObjectId),
        userRepo.updateAddToFollowersById(userId, followedUserObjectId),
      ]);

    // const updatedUser: IUserModel | null =
    //   await userRepo.updateAddToFollowingById(userId, followedUserObjectId);
    // await userRepo.updateAddToFollowersById(userId, followedUserObjectId);

    return {
      user: getInfoData(updatedUser, ["_id", "username", "following"]) as {
        _id: string;
        username: string;
        following: Array<string>;
      },
    };
  }

  async unfollowing(
    userId: Types.ObjectId,
    followedUserId: string
  ): Promise<{
    user: { _id: string; username: string; following: Array<string> };
  }> {
    if (!isValidObjectId(followedUserId)) {
      throw new UnauthorizedError(getMessageError(102));
    }
    const followedUserObjectId: Types.ObjectId =
      convertStringToObjectId(followedUserId);

    const [user, followedUser]: [IUserModel | null, IUserModel | null] =
      await Promise.all([
        userRepo.findById(userId),
        userRepo.findById(followedUserObjectId),
      ]);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!followedUser) {
      throw new UnauthorizedError(getMessageError(103));
    }

    const [updatedUser, _]: [IUserModel | null, IUserModel | null] =
      await Promise.all([
        userRepo.updateRemoveFromFollowingById(userId, followedUserObjectId),
        userRepo.updateRemoveFromFollowersById(userId, followedUserObjectId),
      ]);
    // const updatedUser = await userRepo.updateRemoveFromFollowingById(
    //   userId,
    //   followedUserObjectId
    // );
    // await userRepo.updateRemoveFromFollowersById(
    //   userId,
    //   followedUserObjectId
    // );

    return {
      user: getInfoData(updatedUser, ["_id", "username", "following"]) as {
        _id: string;
        username: string;
        following: Array<string>;
      },
    };
  }

  async turnOnModePrivate(userId: Types.ObjectId): Promise<{
    user: {
      _id: string;
      username: string;
      modePrivate: boolean;
    };
  }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const updatedUser: IUserModel | null =
      await userRepo.updateModePrivateToOnById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "username", "modePrivate"]) as {
        _id: string;
        username: string;
        modePrivate: boolean;
      },
    };
  }
  async turnOffModePrivate(userId: Types.ObjectId): Promise<{
    user: {
      _id: string;
      username: string;
      modePrivate: boolean;
    };
  }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const updatedUser: IUserModel | null =
      await userRepo.updateModePrivateToOffById(userId);
    return {
      user: getInfoData(updatedUser, ["_id", "username", "modePrivate"]) as {
        _id: string;
        username: string;
        modePrivate: boolean;
      },
    };
  }

  async findFollowingsById(
    userId: Types.ObjectId
  ): Promise<{ followings: (Types.ObjectId | IUserModel)[] | undefined }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const followings: (Types.ObjectId | IUserModel)[] | undefined =
      await userRepo.findFollowingsById(userId);
    return {
      followings,
    };
  }

  async findFollowingsByIdAndHaveStories(
    userId: Types.ObjectId
  ): Promise<{ followings: IUserModel[] }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    let followings: IUserModel[] | undefined =
      (await userRepo.findFollowingsById(userId)) as IUserModel[] | undefined;
    if (!followings) {
      throw new BadRequestError(getMessageError(104));
    }
    followings = await Promise.all(
      followings.map(async function (following: IUserModel) {
        following.stories = await storyRepo.findStoriesByUser(following.id);
        return following;
      })
    );
    // have story
    followings = followings.filter(
      (following: IUserModel) => following.stories.length !== 0
    );
    followings = followings.map((following: IUserModel) => {
      const viewed: boolean = Boolean(
        following.stories.find((story: IStoryModel) => {
          return story.usersViewed.includes(userId);
        })
      );
      following.viewed = viewed;
      return following;
    });

    const viewedFollowings: Array<IUserModel> = [];
    const unviewedFollowings: Array<IUserModel> = [];
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

  async searchUsers(search: string = ""): Promise<{
    users: {
      _id: string;
      username: string;
      name: string;
      avatar: string;
    }[];
  }> {
    const users: IUserModel[] = await userRepo.searchUsers(search);
    if (users.length === 0) {
      throw new BadRequestError(getMessageError(105));
    }

    return {
      users: users.map(
        (user) =>
          getInfoData(user, ["_id", "username", "name", "avatar"]) as {
            _id: string;
            username: string;
            name: string;
            avatar: string;
          }
      ),
    };
  }
  async updateLatestOnlineAt(userId: string): Promise<IUserModel | null> {
    if (!isValidObjectId(userId)) {
      throw new UnauthorizedError(getMessageError(106));
    }
    const user: IUserModel | null = await userRepo.findById(
      convertStringToObjectId(userId)
    );
    if (!user) {
      throw new BadRequestError(getMessageError(101));
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
  ): Promise<{ user: IUserModel | null }> {
    const user: IUserModel | null = await userRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    let avatar: string | undefined = undefined;
    if (file) {
      avatar = await new UploadFiles(
        "messages",
        "images",
        file
      ).uploadFileAndDownloadURL();
    }
    const updatedUser: IUserModel | null = await userRepo.updateProfile(
      userId,
      {
        ...body,
        avatar,
        show_account_suggestions: Boolean(body.show_account_suggestions),
      }
    );
    return {
      user: updatedUser,
    };
  }

  async updatePassword(
    userId: Types.ObjectId,
    body: {
      currentPassword: string;
      newPassword: string;
      retypeNewPassword: string;
    },
    keyStore?: IKeyTokenModel | null
  ): Promise<{}> {
    const { error } = UpdatePassword(body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user: IUserModel | null = await userRepo.findByIdWithPassword(userId);
    if (!user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    if (!(await user.matchPassword(body.currentPassword))) {
      throw new BadRequestError(getMessageError(107));
    }

    if (body.currentPassword === body.newPassword) {
      throw new BadRequestError(getMessageError(108));
    }

    if (body.newPassword !== body.retypeNewPassword) {
      throw new BadRequestError(getMessageError(109));
    }

    user.password = body.newPassword;
    await user.save({ validateBeforeSave: true });

    //logout
    if (!keyStore) {
      throw new UnauthorizedError(getMessageError(110));
    }
    const delKey = await keytokenService.removeKeyById(keyStore.id);
    return {};
  }
}

export default new UserService();

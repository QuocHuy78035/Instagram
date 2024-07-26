import { Types } from "mongoose";
import User from "../data/models/user.model";
import { IUserModel } from "../data/interfaces/user.interface";

class UserRepo {
  constructor() {}

  async findById(id: Types.ObjectId): Promise<IUserModel | null> {
    return await User.findById(id);
  }

  async findByIdWithPassword(id: Types.ObjectId): Promise<IUserModel | null> {
    return await User.findById(id).select("+password");
  }

  async findByUsername(username: string): Promise<IUserModel | null> {
    return await User.findOne({ username }).select({
      _id: 1,
      name: 1,
      username: 1,
      avatar: 1,
      following: 1,
      followers: 1,
      modePrivate: 1,
    });
  }

  async findOneByUsernameAndActiveUser(
    username: string
  ): Promise<IUserModel | null> {
    return await User.findOne({ username, status: "active" }).select(
      "+password"
    );
  }

  async findOneByMobileAndActiveUser(
    mobile: string
  ): Promise<IUserModel | null> {
    return await User.findOne({ mobile, status: "active" }).select("+password");
  }

  async findOneByMobileAndUnverifiedUser(
    mobile: string
  ): Promise<IUserModel | null> {
    return await User.findOne({ mobile, status: "unverified" });
  }

  async findOneByEmailAndActiveUser(email: string): Promise<IUserModel | null> {
    return await User.findOne({ email, status: "active" }).select("+password");
  }

  async findOneByEmailAndUnverifiedUser(
    email: string
  ): Promise<IUserModel | null> {
    return await User.findOne({ email, status: "unverified" });
  }

  async findOneByPasswordResetToken(
    passwordResetToken: string
  ): Promise<IUserModel | null> {
    return await User.findOne({
      passwordResetToken,
      passwordResetExpires: {
        $gte: Date.now(),
      },
    }).select("+passwordChangedAt");
  }

  async findFollowingsById(
    userId: Types.ObjectId
  ): Promise<(Types.ObjectId | IUserModel)[] | undefined> {
    const user = await User.findById(userId)
      .populate({
        path: "following",
        select: { _id: 1, name: 1, avatar: 1, username: 1 },
      })
      .lean();
    return user?.following;
  }

  async findByIdAndDelete(userId: Types.ObjectId): Promise<IUserModel | null> {
    return await User.findByIdAndDelete(userId);
  }

  async createUser(body: {
    mobile?: string;
    email?: string;
    name: string;
    username: string;
    password: string;
  }): Promise<IUserModel> {
    return await User.create(body);
  }

  async updateUserToActiveByEmail(email: string): Promise<IUserModel | null> {
    return await User.findOneAndUpdate({ email }, { status: "active" });
  }

  async updateUserToActiveByMobile(mobile: string): Promise<IUserModel | null> {
    return await User.findOneAndUpdate({ mobile }, { status: "active" });
  }

  async updatePasswordReset(
    userId: Types.ObjectId,
    passwordResetToken: string,
    passwordResetExpires: Date
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(userId, {
      passwordResetToken,
      passwordResetExpires,
    });
  }

  async updateAddToFollowingById(
    userId: Types.ObjectId,
    followedUserId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          following: followedUserId,
        },
      },
      { new: true }
    );
  }

  async updateRemoveFromFollowingById(
    userId: Types.ObjectId,
    followedUserId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          following: followedUserId,
        },
      },
      { new: true }
    );
  }

  async updateAddToFollowersById(
    userId: Types.ObjectId,
    followedUserId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      followedUserId,
      {
        $addToSet: {
          followers: userId,
        },
      },
      { new: true }
    );
  }

  async updateRemoveFromFollowersById(
    userId: Types.ObjectId,
    followedUserId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      followedUserId,
      {
        $pull: {
          followers: userId,
        },
      },
      { new: true }
    );
  }

  async updateModePrivateToOnById(
    userId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        modePrivate: "on",
      },
      { new: true }
    );
  }

  async updateModePrivateToOffById(
    userId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        modePrivate: "off",
      },
      { new: true }
    );
  }

  async updateLatestOnlineAt(
    userId: Types.ObjectId
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        latestOnlineAt: new Date(Date.now()),
      },
      { new: true }
    );
  }

  async updateProfile(
    userId: Types.ObjectId,
    body: {
      avatar?: string;
      name?: string;
      username?: string;
      bio?: string;
      gender?: string;
      show_account_suggestions?: boolean;
    }
  ): Promise<IUserModel | null> {
    return await User.findByIdAndUpdate(userId, body, { new: true });
  }

  async searchUsers(search: string): Promise<IUserModel[]>{
    const users = await User.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query: search || " ",
                  path: "username",
                  tokenOrder: "sequential",
                  fuzzy: { maxEdits: 2, prefixLength: 0 },
                },
              },
              {
                autocomplete: {
                  query: search || " ",
                  path: "name",
                  tokenOrder: "sequential",
                  fuzzy: { maxEdits: 2, prefixLength: 0 },
                },
              },
            ],
          },
        },
      },
      {
        $match: {
          status: "active",
        },
      },
    ]);
    return users;
  }
}

export default new UserRepo();

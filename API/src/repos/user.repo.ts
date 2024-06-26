import { Types } from "mongoose";
import User from "../data/models/user.model";

class UserRepo {
  constructor() {}

  async findById(id: Types.ObjectId) {
    return await User.findById(id);
  }

  async findOneByUsernameAndActiveUser(username: string) {
    return await User.findOne({ username, status: "active" }).select(
      "+password"
    );
  }

  async findOneByMobileAndActiveUser(mobile: string) {
    return await User.findOne({ mobile, status: "active" }).select("+password");
  }

  async findOneByMobileAndUnverifiedUser(mobile: string) {
    return await User.findOne({ mobile, status: "unverified" });
  }

  async findOneByEmailAndActiveUser(email: string) {
    return await User.findOne({ email, status: "active" }).select("+password");
  }

  async findOneByEmailAndUnverifiedUser(email: string) {
    return await User.findOne({ email, status: "unverified" });
  }

  async findOneByPasswordResetToken(passwordResetToken: string) {
    return await User.findOne({
      passwordResetToken,
      passwordResetExpires: {
        $gte: Date.now(),
      },
    }).select("+passwordChangedAt");
  }

  async findFollowingsById(userId: Types.ObjectId) {
    const user = await User.findById(userId)
      .populate({
        path: "following",
        select: { _id: 1, name: 1, avatar: 1, username: 1 },
      })
      .lean();
    return user?.following;
  }

  async createUser(body: {
    mobile?: string;
    email?: string;
    name: string;
    username: string;
    password: string;
  }) {
    return await User.create(body);
  }

  async updateUserToActiveByEmail(email: string) {
    await User.findOneAndUpdate({ email }, { status: "active" });
  }

  async updateUserToActiveByMobile(mobile: string) {
    await User.findOneAndUpdate({ mobile }, { status: "active" });
  }

  async updatePasswordReset(
    userId: Types.ObjectId,
    passwordResetToken: string,
    passwordResetExpires: Date
  ) {
    await User.findByIdAndUpdate(userId, {
      passwordResetToken,
      passwordResetExpires,
    });
  }

  async updateAddToFollowingById(
    userId: Types.ObjectId,
    followedUserId: Types.ObjectId
  ) {
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
  ) {
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
  ) {
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
  ) {
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

  async updateModePrivateToOnById(userId: Types.ObjectId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        modePrivate: "on",
      },
      { new: true }
    );
  }

  async updateModePrivateToOffById(userId: Types.ObjectId) {
    return await User.findByIdAndUpdate(
      userId,
      {
        modePrivate: "off",
      },
      { new: true }
    );
  }
}

export default new UserRepo();

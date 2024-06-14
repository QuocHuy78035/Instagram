import { ObjectId } from "mongoose";
import User from "../data/models/user.model";

class UserRepo {
  constructor() {}

  async findById(id: ObjectId) {
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
    });
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
    userId: ObjectId,
    passwordResetToken: string,
    passwordResetExpires: Date
  ) {
    await User.findByIdAndUpdate(userId, {
      passwordResetToken,
      passwordResetExpires,
    });
  }
}

export default new UserRepo();

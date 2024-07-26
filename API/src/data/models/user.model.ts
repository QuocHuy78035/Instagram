import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel } from "../interfaces/user.interface";
import { DEFAULT_IMAGE, UserName } from "../../utils/globalvariables";

const userSchema: Schema<IUserModel> = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Please provide your name!"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    avatar: {
      type: String,
      default: DEFAULT_IMAGE,
    },
    status: {
      type: String,
      enum: ["unverified", "active", "unactive"],
      default: "unverified",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    bio: {
      type: String,
      maxLength: 150,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
      default: "Prefer not to say",
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    show_account_suggestions: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please provide your password!"],
      select: false,
    },
    passwordChangedAt: { type: Date, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    OTP: String,
    OTPExpires: Date,
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      default: [],
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
      default: [],
    },
    modePrivate: {
      type: String,
      enum: ["on", "off"],
      default: "off",
    },
    latestOnlineAt: Date,
  },
  { timestamps: true, collection: UserName.COLLECTION_NAME }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = model<IUserModel>(UserName.DOCUMENT_NAME, userSchema);
export default User;

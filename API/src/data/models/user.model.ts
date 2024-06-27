import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel } from "../interfaces/user.interface";
import { UserName } from "../../utils/globalvariables";
const DEFAULT_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/insta-ebedc.appspot.com/o/users%2Fimages%2F143086968_2856368904622192_1959732218791162458_n.png?alt=media&token=77e45ba1-a6c1-444d-bbaf-05c13e01cf43";
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
    gender: {
      type: String,
      enum: ["Male", "Female", "Undefined"],
    },
    dateOfBirth: {
      type: Date,
      default: null,
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
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = model<IUserModel>(UserName.DOCUMENT_NAME, userSchema);
export default User;

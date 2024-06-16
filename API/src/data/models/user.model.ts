import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel } from "../interfaces/user.interface";
import { UserName } from "../../utils/globalvariables";

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
      default: "",
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
    passwordChangedAt: Date,
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

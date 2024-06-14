import mongoose, { Mongoose, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel } from "../interfaces/user.interface";
const COLLECTION_NAME = "users";
const DOCUMENT_NAME = "User";

const userSchema: Schema<IUserModel> = new mongoose.Schema<IUserModel>(
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
    // passwordConfirm: {
    //   type: String,
    //   required: [true, "Please provide your password confirm!"],
    //   select: false,
    //   validate: {
    //     validator: function (val) {
    //       return val === this.password;
    //     },
    //     message: "Passwords are not the same!",
    //   },
    // },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    OTP: String,
    OTPExpires: Date,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model<IUserModel>(DOCUMENT_NAME, userSchema);
export default User;

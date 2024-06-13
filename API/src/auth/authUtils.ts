import { ObjectId } from "mongoose";
import JWT from "jsonwebtoken";
import { UnauthorizedError } from "../core/error.response";

export const createTokenPair = async (
  payload: {
    userId: ObjectId;
    email?: string;
    mobile?: string;
    username?: string;
    role: string;
  },
  privateKey: string,
  publicKey: string
) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });
    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
  } catch (err) {
    throw new UnauthorizedError("Something wrong!");
  }
};

import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import { BadRequestError, UnauthorizedError } from "../../core/error.response";
import keytokenRepo from "../../repos/keytoken.repo";
import JWT, { JwtPayload } from "jsonwebtoken";
import JwtPayloadV2 from "../../data/interfaces/jwtpayloadv2.interface";
import { asyncHandler } from "../../helpers/asyncHandler";
import userRepo from "../../repos/user.repo";
import { isValidObjectId } from "mongoose";
import { convertStringToObjectId } from "../../utils";
import { IUserModel } from "../../data/interfaces/user.interface";
import { IKeyTokenModel } from "../../data/interfaces/keytoken.interface";
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

export const authentication = asyncHandler(
  async (req: RequestV2, res: Response, next: NextFunction) => {
    const userId: string | undefined = req.headers[HEADER.CLIENT_ID] as
      | string
      | undefined;
    if (!userId) {
      throw new UnauthorizedError("Invalid Request!");
    }
    if (!isValidObjectId(userId)) {
      throw new UnauthorizedError("User id is invalid!");
    }
    const [user, keyStore]: [IUserModel | null, IKeyTokenModel | null] =
      await Promise.all([
        userRepo.findById(convertStringToObjectId(userId)),
        keytokenRepo.findByUserId(userId),
      ]);
    if (!user) {
      throw new UnauthorizedError("User not found!");
    }
    if (!keyStore) {
      throw new UnauthorizedError("Not found KeyStore!");
    }

    if (req.headers[HEADER.REFRESHTOKEN]) {
      const refreshToken = req.headers[HEADER.REFRESHTOKEN] as string;
      if (!refreshToken) {
        throw new UnauthorizedError("Invalid Request!");
      }

      try {
        const decodedUser: JwtPayloadV2 = JWT.verify(
          refreshToken,
          keyStore.privateKey
        ) as JwtPayloadV2;
        if (user.id !== decodedUser.userId) {
          throw new UnauthorizedError("Invalid UserId!");
        }
        req.keyStore = keyStore;
        req.user = decodedUser;
        req.refreshToken = refreshToken;
      } catch (err) {
        throw err;
      }
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
    if (!accessToken) {
      throw new UnauthorizedError("Invalid Request!");
    }

    try {
      const decodedUser: JwtPayloadV2 = JWT.verify(
        accessToken,
        keyStore.publicKey
      ) as JwtPayloadV2;
      if (user.id !== decodedUser.userId) {
        throw new UnauthorizedError("Invalid UserId!");
      }
      req.keyStore = keyStore;
      req.user = decodedUser;
      next();
    } catch (err) {
      throw err;
    }
  }
);

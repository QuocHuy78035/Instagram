import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";
import userController from "../controllers/user.controller";
import upload from "../middlewares/interceptors/uploadfile.interceptor";

class UserRouter {
  router = express.Router();
  constructor() {
    this.initialRouter();
  }

  initialRouter() {

    this.router.route("/:userId").get(asyncHandler(userController.getAnotherUserByUserId));

    this.router.route("/search").get(asyncHandler(userController.searchUsers));
    this.router
      .route("/profile/:username")
      .get(asyncHandler(userController.getUserByUsername));
    this.router.use(authentication);
    this.router
      .route("/me")
      .get(asyncHandler(userController.getUserById))
      .patch(upload.single("file"), asyncHandler(userController.updateProfile));
    this.router
      .route("/password")
      .patch(asyncHandler(userController.updatePassword));
    this.router
      .route("/followingAndHaveStories")
      .get(asyncHandler(userController.findFollowingsByIdAndHaveStories));
    this.router
      .route("/following")
      .get(asyncHandler(userController.findFollowingsById));
    this.router
      .route("/following/:followedUserId")
      .patch(asyncHandler(userController.following));
    this.router
      .route("/unfollowing/:followedUserId")
      .patch(asyncHandler(userController.unfollowing));
    this.router
      .route("/modePrivate/on")
      .patch(asyncHandler(userController.turnOnModePrivate));
    this.router
      .route("/modePrivate/off")
      .patch(asyncHandler(userController.turnOffModePrivate));
  }
}

export default new UserRouter().router;
import express from "express";
import authenController from "../middlewares/controllers/authen.controller";
import { asyncHandler } from "../helpers/asyncHandler";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";

class AuthenRouter {
  router = express.Router();
  constructor() {
    this.initialRouter();
  }

  initialRouter() {
    this.router.route("/login").post(asyncHandler(authenController.logIn));
    this.router
      .route("/logout")
      .post(authentication, asyncHandler(authenController.logOut));
    this.router.route("/signup").post(asyncHandler(authenController.signUp));
    this.router
      .route("/verifycode")
      .post(asyncHandler(authenController.verifyCode));
    this.router
      .route("/resetPassword/:resetToken")
      .post(asyncHandler(authenController.resetPassword));
    this.router
      .route("/forgotPassword")
      .post(asyncHandler(authenController.forgotPassword));
  }
}

export default new AuthenRouter().router;

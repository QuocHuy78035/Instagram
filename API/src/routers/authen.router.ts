import express from "express";
import authenController from "../middlewares/controllers/authen.controller";
import { asyncHandler } from "../helpers/asyncHandler";

class AuthenRouter {
  router = express.Router();
  constructor() {
    this.initialRouter();
  }

  initialRouter() {
    this.router.post("/login", asyncHandler(authenController.logIn));
    this.router.post("/signup", asyncHandler(authenController.signUp));
    this.router.post("/verifycode", asyncHandler(authenController.verifyCode));
    this.router.post(
      "/resetPassword/:resetToken",
      asyncHandler(authenController.resetPassword)
    );
    this.router.post(
      "/forgotPassword",
      asyncHandler(authenController.forgotPassword)
    );
    this.router.post("/logout", asyncHandler(authenController.resetPassword));
  }
}

export default new AuthenRouter().router;

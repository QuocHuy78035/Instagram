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
  }
}

export default new AuthenRouter().router;

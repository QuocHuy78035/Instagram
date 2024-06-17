import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";
import messageController from "../middlewares/controllers/message.controller";
class MessageRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }

  async initRouter() {
    this.router.use(authentication);
    this.router.route("/").post(asyncHandler(messageController.sendMessage));
  }
}

export default new MessageRouter().router;

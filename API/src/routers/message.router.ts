import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";
import messageController from "../middlewares/controllers/message.controller";
import upload from "../middlewares/interceptors/uploadfile.interceptor";
class MessageRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }

  async initRouter() {
    this.router.use(authentication);
    this.router
      .route("/")
      .post(upload.single("file"), asyncHandler(messageController.sendMessage));
  }
}

export default new MessageRouter().router;

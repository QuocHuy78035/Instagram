import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";
import messageController from "../controllers/message.controller";
import upload from "../middlewares/interceptors/uploadfile.interceptor";
class MessageRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }

  initRouter() {
    this.router.use(authentication);
    this.router
      .route("/")
      .post(upload.single("file"), asyncHandler(messageController.sendMessage))
      .get(asyncHandler(messageController.findByConversation));
    this.router
      .route("/chatai")
      .post(asyncHandler(messageController.answerMessageByAI));
    this.router
      .route("/:messageId")
      .delete(asyncHandler(messageController.deleteMessage));
  }
}

export default new MessageRouter().router;

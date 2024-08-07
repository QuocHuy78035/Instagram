import express from "express";
import conversationController from "../controllers/conversation.controller";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";

class ConversationRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }
  initRouter() {
    this.router.use(authentication);
    this.router
      .route("/")
      .post(asyncHandler(conversationController.createConversation));
    this.router
      .route("/")
      .get(asyncHandler(conversationController.getAllConversations));
    this.router
      .route("/:conversation")
      .get(asyncHandler(conversationController.getConversation))
      .delete(asyncHandler(conversationController.deleteConversation));
  }
}

export default new ConversationRouter().router;

import express from "express";
import { asyncHandler } from "../helpers/asyncHandler";
import postController from "../controllers/post.controller";
import upload from "../middlewares/interceptors/uploadfile.interceptor";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";

class PostRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }

  initRouter() {
    this.router.route("/").get(asyncHandler(postController.getPosts));
    this.router.use(authentication);
    this.router
      .route("/")
      .post(upload.array("files"), asyncHandler(postController.createPost));
  }
}

export default new PostRouter().router;

import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import storyController from "../middlewares/controllers/story.controller";
import upload from "../middlewares/interceptors/uploadfile.interceptor";
import { asyncHandler } from "../helpers/asyncHandler";

class StoryRouter {
  router = express.Router();
  constructor() {
    this.initialRouter();
  }

  initialRouter() {
    this.router.use(authentication);
    this.router
      .route("/")
      .post(upload.single("file"), asyncHandler(storyController.createStory))
      .get(asyncHandler(storyController.findStoriesByUser));
  }
}

export default new StoryRouter().router;

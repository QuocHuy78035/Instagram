import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import storyController from "../controllers/story.controller";
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
      .get(asyncHandler(storyController.findStoriesOfOtherUser));
    this.router
      .route("/:id/userViewed")
      .patch(asyncHandler(storyController.updateUserViewedById));
    this.router.route("/:id").delete(asyncHandler(storyController.deleteStory));
  }
}

export default new StoryRouter().router;

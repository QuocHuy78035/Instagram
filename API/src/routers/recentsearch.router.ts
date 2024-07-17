import express from "express";
import { authentication } from "../middlewares/interceptors/authentication.interceptor";
import recentsearchController from "../middlewares/controllers/recentsearch.controller";
import { asyncHandler } from "../helpers/asyncHandler";

class RecentSearchRouter {
  router = express.Router();
  constructor() {
    this.initRouter();
  }

  initRouter() {
    this.router.use(authentication);
    this.router
      .route("/")
      .get(asyncHandler(recentsearchController.findRecentSearchByUser))
      .patch(
        asyncHandler(
          recentsearchController.removeAllSearchedUsersFromRecentSearch
        )
      );
    this.router
      .route("/:searchedUser")
      .patch(
        asyncHandler(recentsearchController.removeSearchedUserFromRecentSearch)
      )
      .post(asyncHandler(recentsearchController.addSearchedUserToRecentSearch));
  }
}

export default new RecentSearchRouter().router;

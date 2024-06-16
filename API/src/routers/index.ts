import express from "express";
import authenRouter from "./authen.router";
import storyRouter from "./story.router";
import userRouter from "./user.router";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(API_V1, authenRouter);
router.use(API_V1 + "/story", storyRouter);
router.use(API_V1 + "/user", userRouter);
export default router;

import express from "express";
import authenRouter from "./authen.router";
import storyRouter from "./story.router";
import userRouter from "./user.router";
import conversationRouter from "./conversation.router";
import messageRouter from "./message.router";
import recentsearchRouter from "./recentsearch.router";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(API_V1, authenRouter);
router.use(API_V1 + "/story", storyRouter);
router.use(API_V1 + "/user", userRouter);
router.use(API_V1 + "/conversation", conversationRouter);
router.use(API_V1 + "/message", messageRouter);
router.use(API_V1 + "/recentsearch", recentsearchRouter);
export default router;

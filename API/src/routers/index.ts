import express from "express";
import authenRouter from "./authen.router";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(API_V1, authenRouter);

export default router;

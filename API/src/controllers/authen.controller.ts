import { Request, Response, NextFunction } from "express";
import authenService from "../services/authen.service";
import { CREATED, OK } from "../core/success.response";
import RequestV2 from "../data/interfaces/requestv2.interface";
import getMessage from "../helpers/getMessage";
class AuthenController {
  constructor() {}

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const body = await authenService.signUp(req.body);

    new CREATED(body).send(res);
  };

  verifyCode = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const metadata = await authenService.verifyOTP(req.body);

    new CREATED({
      message: getMessage(200),
      metadata,
    }).send(res);
  };

  logIn = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const metadata = await authenService.logIn(req.body);
    new OK({
      message: getMessage(201),
      metadata,
    }).send(res);
  };

  logOut = async (req: RequestV2, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const body = await authenService.logOut(req.keyStore);
    new OK(body).send(res);
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const metadata = await authenService.resetPassword(
      req.body,
      req.params.resetToken
    );
    new OK({
      message: getMessage(202),
      metadata,
    }).send(res);
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    const body = await authenService.forgotPassword(req.body);
    new OK(body).send(res);
  };
}

export default new AuthenController();

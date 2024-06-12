import { Request, Response, NextFunction } from "express";
import authenService from "../../services/authen.service";
import { CREATED, OK } from "../../core/success.response";
class AuthenController {
  constructor() {}

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Body:::", req.body);
    await authenService.signUp(req.body);

    new CREATED({
      message: "Sign up successfully!",
    }).send(res);
  };

  logIn = async (req: Request, res: Response, next: NextFunction) => {
    new OK({
      message: "Log in successfully!",
      metadata: "Hello",
    }).send(res);
  };
}

export default new AuthenController();

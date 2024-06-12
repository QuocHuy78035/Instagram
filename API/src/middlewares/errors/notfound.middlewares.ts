import { NotFoundError } from "../../core/error.response";
import { NextFunction, Request, Response } from "express";

export const NotFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new NotFoundError();
  next(error);
};

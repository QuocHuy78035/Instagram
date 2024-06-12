import { ErrorResponse} from "../../data/error.class";
import { NextFunction, Request, Response } from "express";
import { formatString } from "../../utils";

const INTERNAL_SERVER_ERROR_STATUS = 500;

export const GlobalErrorMiddleware = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error", error.status);
  const statusCode = error.status || INTERNAL_SERVER_ERROR_STATUS;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    err: error.stack,
    message: formatString(error.message) || "Internal Server Error",
  });
};

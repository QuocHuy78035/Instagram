import { ErrorResponse } from "../../data/error.class";
import { NextFunction, Request, Response } from "express";
import { formatErrorString } from "../../utils";
import statusCodes from "../../utils/statusCodes";

export const GlobalErrorMiddleware = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error", error.status, error.stack);
  const statusCode = error.status || statusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    // err: error.stack,
    message: formatErrorString(error.message) || "Internal Server Error",
  });
};

import { Request, Response, NextFunction } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";

export const asyncHandler = (
  fn: (req: RequestV2, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: RequestV2, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

import { NotFoundError } from "@/core/errors/http/not-found-error";
import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, __: Response, ___: NextFunction) => {
  throw new NotFoundError(`Route ${req.method} ${req.path}`);
};

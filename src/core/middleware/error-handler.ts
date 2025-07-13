import { AppError } from "@/core/errors/base/app-error";
import { NextFunction, Request, Response } from "express";
import { ErrorCodes } from "../errors/error-codes-registery";
import Logger from "../utils/logger";

export const errorHandler = (err: unknown, req: Request, res: Response, _: NextFunction) => {
  const isDev = process.env["NODE_ENV"] === "development";

  if (err instanceof AppError) {
    Logger.warn(`[AppError]: ${err.code}`, {
      path: req.path,
      statusCode: err.statusCode,
      ...(isDev && { stack: err.stack }),
    });

    res.status(err.statusCode).json(err.serialize());
    return;
  }

  const normalizedError = err instanceof Error ? err : undefined;

  const stack = err instanceof Error ? err.stack : undefined;

  Logger.error(`[UnhandledError]:`, {
    path: req.path,
    method: req.method,
    query: req.query,
    body: req.body,
    error: normalizedError?.message,
    ...(isDev && { stack }),
  });

  const UnhandledErrorResponse = {
    code: ErrorCodes.INTERNAL_ERROR.code,
    message: ErrorCodes.INTERNAL_ERROR.message,
    statusCode: ErrorCodes.INTERNAL_ERROR.statusCode,
    timestamp: new Date().toISOString(),
    ...(isDev &&
      stack && {
        stack,
      }),
  };

  res.status(UnhandledErrorResponse.statusCode).json(UnhandledErrorResponse);
};

import { ErrorResponse } from "../error.types";

export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly code: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  serialize(): ErrorResponse {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: new Date().toISOString(),
      ...(process.env["NODE_ENV"] === "development" && { stack: this.stack }),
    };
  }
}

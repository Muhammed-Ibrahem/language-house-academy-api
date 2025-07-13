import { AppError } from "../base/app-error";
import { ErrorCodes } from "../error-codes-registery";

export class NotFoundError extends AppError {
  override readonly statusCode = ErrorCodes.NOT_FOUND.statusCode;
  override readonly code = ErrorCodes.NOT_FOUND.code;

  constructor(resource: string) {
    super(`${resource} ${ErrorCodes.NOT_FOUND.message}`);
  }
}

import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DatabaseTimeoutError extends AppError {
  override readonly code = ErrorCodes.DB_TIMEOUT.code;
  override readonly statusCode = ErrorCodes.DB_TIMEOUT.statusCode;

  constructor(message: string = ErrorCodes.DB_TIMEOUT.message) {
    super(message);
  }
}

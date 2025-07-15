import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DatabaseConflictError extends AppError {
  override readonly statusCode = ErrorCodes.DB_CONFLICT.statusCode;
  override readonly code = ErrorCodes.DB_CONFLICT.code;

  constructor(message: string = ErrorCodes.DB_CONFLICT.message) {
    super(message);
  }
}

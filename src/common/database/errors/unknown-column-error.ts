import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class UnknownColumnError extends AppError {
  override readonly code = ErrorCodes.DB_UNKNOWN_COLUMN.code;
  override readonly statusCode = ErrorCodes.DB_UNKNOWN_COLUMN.statusCode;

  constructor(message: string = ErrorCodes.DB_UNKNOWN_COLUMN.message) {
    super(message);
  }
}

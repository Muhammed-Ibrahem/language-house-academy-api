import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DatabaseQueryError extends AppError {
  override readonly code = ErrorCodes.DB_GENERIC.code;
  override readonly statusCode = ErrorCodes.DB_GENERIC.statusCode;

  constructor(message: string = ErrorCodes.DB_GENERIC.message) {
    super(message);
  }
}

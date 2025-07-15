import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DatabaseConnectionError extends AppError {
  override readonly code = ErrorCodes.DB_CONNECTION.code;
  override readonly statusCode = ErrorCodes.DB_CONNECTION.statusCode;

  constructor(message: string = ErrorCodes.DB_CONNECTION.message) {
    super(message);
  }
}

import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DatabaseConnectionLostError extends AppError {
  override readonly code = ErrorCodes.DB_CONNECTION_LOST.code;
  override readonly statusCode = ErrorCodes.DB_CONNECTION_LOST.statusCode;

  constructor(message: string = ErrorCodes.DB_CONNECTION_LOST.message) {
    super(message);
  }
}

import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class TooManyConnectionsError extends AppError {
  override readonly code = ErrorCodes.DB_TOO_MANY_CONNECTIONS.code;
  override readonly statusCode = ErrorCodes.DB_TOO_MANY_CONNECTIONS.statusCode;

  constructor(message: string = ErrorCodes.DB_TOO_MANY_CONNECTIONS.message) {
    super(message);
  }
}

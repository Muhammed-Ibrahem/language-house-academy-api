import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class WrongValueCountError extends AppError {
  override readonly code = ErrorCodes.DB_WRONG_VALUE_COUNT.code;
  override readonly statusCode = ErrorCodes.DB_WRONG_VALUE_COUNT.statusCode;

  constructor(message: string = ErrorCodes.DB_WRONG_VALUE_COUNT.message) {
    super(message);
  }
}

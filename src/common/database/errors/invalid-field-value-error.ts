import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class InvalidFieldValueError extends AppError {
  override readonly code = ErrorCodes.INVALID_FIELD_VALUE.code;
  override readonly statusCode = ErrorCodes.INVALID_FIELD_VALUE.statusCode;

  constructor(message: string = ErrorCodes.INVALID_FIELD_VALUE.message) {
    super(message);
  }
}

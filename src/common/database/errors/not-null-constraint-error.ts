import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class NotNullConstraintError extends AppError {
  override readonly code = ErrorCodes.NOT_NULL.code;
  override readonly statusCode = ErrorCodes.NOT_NULL.statusCode;

  constructor(message: string = ErrorCodes.NOT_NULL.message) {
    super(message);
  }
}

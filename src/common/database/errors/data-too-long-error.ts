import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DataTooLongError extends AppError {
  override readonly code = ErrorCodes.DATA_TOO_LONG.code;
  override readonly statusCode = ErrorCodes.DATA_TOO_LONG.statusCode;

  constructor(message: string = ErrorCodes.DATA_TOO_LONG.message) {
    super(message);
  }
}

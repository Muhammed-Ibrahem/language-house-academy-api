import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class ForeignKeyMissingError extends AppError {
  override readonly code = ErrorCodes.FK_MISSING.code;
  override readonly statusCode = ErrorCodes.FK_MISSING.statusCode;

  constructor(message: string = ErrorCodes.FK_MISSING.message) {
    super(message);
  }
}

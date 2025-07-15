import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class DuplicateEntryError extends AppError {
  override readonly code = ErrorCodes.DB_DUPLICATE_ENTRY.code;
  override readonly statusCode = ErrorCodes.DB_DUPLICATE_ENTRY.statusCode;

  constructor(message: string = ErrorCodes.DB_DUPLICATE_ENTRY.message) {
    super(message);
  }
}

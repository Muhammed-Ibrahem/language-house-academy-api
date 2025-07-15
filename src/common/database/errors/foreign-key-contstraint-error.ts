import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class ForeignKeyConstraintError extends AppError {
  override readonly code = ErrorCodes.FK_CONSTRAINT.code;
  override readonly statusCode = ErrorCodes.FK_CONSTRAINT.statusCode;

  constructor(message: string = ErrorCodes.FK_CONSTRAINT.message) {
    super(message);
  }
}

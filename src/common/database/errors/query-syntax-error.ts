import { AppError } from "../../../core/errors/base/app-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

export class QuerySyntaxError extends AppError {
  override readonly code = ErrorCodes.DB_SYNTAX_ERROR.code;
  override readonly statusCode = ErrorCodes.DB_SYNTAX_ERROR.statusCode;

  constructor(message: string = ErrorCodes.DB_SYNTAX_ERROR.message) {
    super(message);
  }
}

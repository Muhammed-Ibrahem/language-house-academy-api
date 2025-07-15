import { AppError } from "@/core/errors/base/app-error";
import { DuplicateEntryError } from "../errors/duplicate-entry-error";
import { ForeignKeyMissingError } from "../errors/foreign-key-missing-error";
import { ForeignKeyConstraintError } from "../errors/foreign-key-contstraint-error";
import { NotNullConstraintError } from "../errors/not-null-constraint-error";
import { DataTooLongError } from "../errors/data-too-long-error";
import { InvalidFieldValueError } from "../errors/invalid-field-value-error";
import { DatabaseConnectionError } from "../errors/connection-error";
import { DatabaseConnectionLostError } from "../errors/connection-lost-error";
import { DatabaseQueryError } from "../errors/query-error";
import { QuerySyntaxError } from "../errors/query-syntax-error";
import { DatabaseTimeoutError } from "../errors/time-out-error";
import { TooManyConnectionsError } from "../errors/too-many-connections-error";
import { UnknownColumnError } from "../errors/unknown-column-error";
import { WrongValueCountError } from "../errors/wrong-value-count-error";

export const normalizeError = (err: unknown): AppError => {
  if (err instanceof AppError) return err;

  if (typeof err !== "object" || err === null) {
    return new DatabaseQueryError("Unknown error format");
  }

  if (err instanceof Error && "code" in err) {
    const mysqlCode = err.code as string;

    switch (mysqlCode) {
      case "ER_DUP_ENTRY":
        return new DuplicateEntryError(err.message);
      case "ER_NO_REFERENCED_ROW_2":
        return new ForeignKeyMissingError(err.message);
      case "ER_ROW_IS_REFERENCED_2":
        return new ForeignKeyConstraintError(err.message);
      case "ER_NO_DEFAULT_FOR_FIELD":
        return new NotNullConstraintError(err.message);
      case "ER_DATA_TOO_LONG":
        return new DataTooLongError(err.message);
      case "ER_BAD_NULL_ERROR":
        return new NotNullConstraintError(err.message);
      case "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD":
        return new InvalidFieldValueError(err.message);
      case "PROTOCOL_CONNECTION_LOST":
        return new DatabaseConnectionLostError(err.message);
      case "ECONNREFUSED":
        return new DatabaseConnectionError(err.message);
      case "ER_TOO_MANY_USER_CONNECTIONS":
      case "ER_CON_COUNT_ERROR":
        return new TooManyConnectionsError(err.message);
      case "ETIMEDOUT":
        return new DatabaseTimeoutError(err.message);
      case "ER_PARSE_ERROR":
        return new QuerySyntaxError(err.message);
      case "ER_BAD_FIELD_ERROR":
        return new UnknownColumnError(err.message);
      case "ER_WRONG_VALUE_COUNT_ON_ROW":
        return new WrongValueCountError(err.message);
      default:
        return new DatabaseQueryError(err.message || "Unknown database error");
    }
  }

  return new DatabaseQueryError("Unknown database error");
};

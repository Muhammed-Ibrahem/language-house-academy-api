import { AppError } from "../../../core/errors/base/app-error";
import { DatabaseConflictError } from "./conflict-error";
import { DuplicateEntryError } from "./duplicate-entry-error";
import { ForeignKeyMissingError } from "./foreign-key-missing-error";
import { ForeignKeyConstraintError } from "./foreign-key-contstraint-error";
import { NotNullConstraintError } from "./not-null-constraint-error";
import { DataTooLongError } from "./data-too-long-error";
import { InvalidFieldValueError } from "./invalid-field-value-error";
import { DatabaseConnectionError } from "./connection-error";
import { DatabaseConnectionLostError } from "./connection-lost-error";
import { DatabaseQueryError } from "./query-error";
import { QuerySyntaxError } from "./query-syntax-error";
import { DatabaseTimeoutError } from "./time-out-error";
import { TooManyConnectionsError } from "./too-many-connections-error";
import { UnknownColumnError } from "./unknown-column-error";
import { WrongValueCountError } from "./wrong-value-count-error";
import { ErrorCodes } from "../../../core/errors/error-codes-registery";

describe("Database Errors", () => {
  const cases = [
    {
      name: "DuplicateEntryError",
      Class: DuplicateEntryError,
      expected: ErrorCodes.DB_DUPLICATE_ENTRY,
    },
    {
      name: "DatabaseConflictError",
      Class: DatabaseConflictError,
      expected: ErrorCodes.DB_CONFLICT,
    },
    {
      name: "ForeignKeyMissingError",
      Class: ForeignKeyMissingError,
      expected: ErrorCodes.FK_MISSING,
    },
    {
      name: "ForeignKeyConstraintError",
      Class: ForeignKeyConstraintError,
      expected: ErrorCodes.FK_CONSTRAINT,
    },
    {
      name: "NotNullConstraintError",
      Class: NotNullConstraintError,
      expected: ErrorCodes.NOT_NULL,
    },
    {
      name: "DataTooLongError",
      Class: DataTooLongError,
      expected: ErrorCodes.DATA_TOO_LONG,
    },
    {
      name: "InvalidFieldValueError",
      Class: InvalidFieldValueError,
      expected: ErrorCodes.INVALID_FIELD_VALUE,
    },
    {
      name: "DatabaseConnectionError",
      Class: DatabaseConnectionError,
      expected: ErrorCodes.DB_CONNECTION,
    },
    {
      name: "DatabaseConnectionLostError",
      Class: DatabaseConnectionLostError,
      expected: ErrorCodes.DB_CONNECTION_LOST,
    },
    {
      name: "DatabaseQueryError",
      Class: DatabaseQueryError,
      expected: ErrorCodes.DB_GENERIC,
    },
    {
      name: "QuerySyntaxError",
      Class: QuerySyntaxError,
      expected: ErrorCodes.DB_SYNTAX_ERROR,
    },
    {
      name: "DatabaseTimeoutError",
      Class: DatabaseTimeoutError,
      expected: ErrorCodes.DB_TIMEOUT,
    },
    {
      name: "TooManyConnectionsError",
      Class: TooManyConnectionsError,
      expected: ErrorCodes.DB_TOO_MANY_CONNECTIONS,
    },
    {
      name: "UnknownColumnError",
      Class: UnknownColumnError,
      expected: ErrorCodes.DB_UNKNOWN_COLUMN,
    },
    {
      name: "WrongValueCountError",
      Class: WrongValueCountError,
      expected: ErrorCodes.DB_WRONG_VALUE_COUNT,
    },
  ];

  cases.forEach(({ name, Class, expected }) => {
    it(`should correctly constrcut ${name}`, () => {
      const error = new Class("Custom Message");

      expect(error).toBeInstanceOf(AppError);
      expect(error).toBeInstanceOf(Class);
      expect(error.code).toBe(expected.code);
      expect(error.statusCode).toBe(expected.statusCode);
      expect(error.message).toBe("Custom Message");
    });
  });
});

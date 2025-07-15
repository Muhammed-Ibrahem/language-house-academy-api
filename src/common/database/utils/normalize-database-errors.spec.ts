import { DatabaseConnectionError } from "../errors/connection-error";
import { DatabaseConnectionLostError } from "../errors/connection-lost-error";
import { DataTooLongError } from "../errors/data-too-long-error";
import { DuplicateEntryError } from "../errors/duplicate-entry-error";
import { ForeignKeyConstraintError } from "../errors/foreign-key-contstraint-error";
import { ForeignKeyMissingError } from "../errors/foreign-key-missing-error";
import { InvalidFieldValueError } from "../errors/invalid-field-value-error";
import { NotNullConstraintError } from "../errors/not-null-constraint-error";
import { DatabaseQueryError } from "../errors/query-error";
import { QuerySyntaxError } from "../errors/query-syntax-error";
import { DatabaseTimeoutError } from "../errors/time-out-error";
import { TooManyConnectionsError } from "../errors/too-many-connections-error";
import { UnknownColumnError } from "../errors/unknown-column-error";
import { WrongValueCountError } from "../errors/wrong-value-count-error";
import { normalizeError } from "./normalize-database-errors";

const createMysqlError = (code: string, message = "error message"): any => {
  const err = new Error(message) as any;
  err.code = code;
  return err;
};

describe("normalizeError", () => {
  it("should return the same AppError instance if passed one", () => {
    const appErr = new DatabaseQueryError("Test");
    const result = normalizeError(appErr);
    expect(result).toBe(appErr);
  });

  it("should return DatabaseQueryError if input is not an object", () => {
    expect(normalizeError(null)).toBeInstanceOf(DatabaseQueryError);
    expect(normalizeError("string")).toBeInstanceOf(DatabaseQueryError);
  });

  it("should return DuplicateEntryError for ER_DUP_ENTRY", () => {
    const err = createMysqlError("ER_DUP_ENTRY");
    expect(normalizeError(err)).toBeInstanceOf(DuplicateEntryError);
  });

  it("should return ForeignKeyMissingError for ER_NO_REFERENCED_ROW_2", () => {
    const err = createMysqlError("ER_NO_REFERENCED_ROW_2");
    expect(normalizeError(err)).toBeInstanceOf(ForeignKeyMissingError);
  });

  it("should return ForeignKeyConstraintError for ER_ROW_IS_REFERENCED_2", () => {
    const err = createMysqlError("ER_ROW_IS_REFERENCED_2");
    expect(normalizeError(err)).toBeInstanceOf(ForeignKeyConstraintError);
  });

  it("should return NotNullConstraintError for ER_NO_DEFAULT_FOR_FIELD and ER_BAD_NULL_ERROR", () => {
    const err1 = createMysqlError("ER_NO_DEFAULT_FOR_FIELD");
    const err2 = createMysqlError("ER_BAD_NULL_ERROR");
    expect(normalizeError(err1)).toBeInstanceOf(NotNullConstraintError);
    expect(normalizeError(err2)).toBeInstanceOf(NotNullConstraintError);
  });

  it("should return DataTooLongError for ER_DATA_TOO_LONG", () => {
    const err = createMysqlError("ER_DATA_TOO_LONG");
    expect(normalizeError(err)).toBeInstanceOf(DataTooLongError);
  });

  it("should return InvalidFieldValueError for ER_TRUNCATED_WRONG_VALUE_FOR_FIELD", () => {
    const err = createMysqlError("ER_TRUNCATED_WRONG_VALUE_FOR_FIELD");
    expect(normalizeError(err)).toBeInstanceOf(InvalidFieldValueError);
  });

  it("should return DatabaseConnectionLostError for PROTOCOL_CONNECTION_LOST", () => {
    const err = createMysqlError("PROTOCOL_CONNECTION_LOST");
    expect(normalizeError(err)).toBeInstanceOf(DatabaseConnectionLostError);
  });

  it("should return DatabaseConnectionError for ECONNREFUSED", () => {
    const err = createMysqlError("ECONNREFUSED");
    expect(normalizeError(err)).toBeInstanceOf(DatabaseConnectionError);
  });

  it("should return TooManyConnectionsError for ER_TOO_MANY_USER_CONNECTIONS and ER_CON_COUNT_ERROR", () => {
    const err1 = createMysqlError("ER_TOO_MANY_USER_CONNECTIONS");
    const err2 = createMysqlError("ER_CON_COUNT_ERROR");
    expect(normalizeError(err1)).toBeInstanceOf(TooManyConnectionsError);
    expect(normalizeError(err2)).toBeInstanceOf(TooManyConnectionsError);
  });

  it("should return DatabaseTimeoutError for ETIMEDOUT", () => {
    const err = createMysqlError("ETIMEDOUT");
    expect(normalizeError(err)).toBeInstanceOf(DatabaseTimeoutError);
  });

  it("should return QuerySyntaxError for ER_PARSE_ERROR", () => {
    const err = createMysqlError("ER_PARSE_ERROR");
    expect(normalizeError(err)).toBeInstanceOf(QuerySyntaxError);
  });

  it("should return UnknownColumnError for ER_BAD_FIELD_ERROR", () => {
    const err = createMysqlError("ER_BAD_FIELD_ERROR");
    expect(normalizeError(err)).toBeInstanceOf(UnknownColumnError);
  });

  it("should return WrongValueCountError for ER_WRONG_VALUE_COUNT_ON_ROW", () => {
    const err = createMysqlError("ER_WRONG_VALUE_COUNT_ON_ROW");
    expect(normalizeError(err)).toBeInstanceOf(WrongValueCountError);
  });

  it("should return generic DatabaseQueryError for unknown codes", () => {
    const err = createMysqlError("UNKNOWN_CODE");
    const result = normalizeError(err);
    expect(result).toBeInstanceOf(DatabaseQueryError);
    expect(result.message).toBe("error message");
  });

  it("should return generic DatabaseQueryError for Error without code", () => {
    const err = new Error("No code");
    const result = normalizeError(err);
    expect(result).toBeInstanceOf(DatabaseQueryError);
  });
});

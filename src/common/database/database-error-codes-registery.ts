export const dbErrorCodeRegistery = {
  DB_DUPLICATE_ENTRY: {
    code: "DB_DUPLICATE_ENTRY",
    statusCode: 409,
    message: "Duplicate entry violates unique constraint",
  },
  DB_CONFLICT: {
    code: "DB_CONFLICT",
    statusCode: 409,
    message: "Conflict occurred due to duplicate or constraint violation",
  },
  FK_CONSTRAINT: {
    code: "FK_CONSTRAINT",
    statusCode: 409,
    message: "Foreign key constraint prevents deletion or update",
  },
  FK_MISSING: {
    code: "FK_MISSING",
    statusCode: 400,
    message: "Referenced foreign key does not exist",
  },
  NOT_NULL: {
    code: "NOT_NULL",
    statusCode: 400,
    message: "A required field is missing (null constraint violation)",
  },
  DATA_TOO_LONG: {
    code: "DATA_TOO_LONG",
    statusCode: 400,
    message: "Input value is too long for the column",
  },
  INVALID_FIELD_VALUE: {
    code: "INVALID_FIELD_VALUE",
    statusCode: 400,
    message: "Invalid value provided for a field",
  },
  DB_CONNECTION: {
    code: "DB_CONNECTION",
    statusCode: 500,
    message: "Failed to connect to the database",
  },
  DB_CONNECTION_LOST: {
    code: "DB_CONNECTION_LOST",
    statusCode: 500,
    message: "Lost connection to the database",
  },
  DB_TOO_MANY_CONNECTIONS: {
    code: "DB_TOO_MANY_CONNECTIONS",
    statusCode: 500,
    message: "Too many database connections",
  },
  DB_TIMEOUT: {
    code: "DB_TIMEOUT",
    statusCode: 500,
    message: "Database connection timed out",
  },
  DB_SYNTAX_ERROR: {
    code: "DB_SYNTAX_ERROR",
    statusCode: 500,
    message: "Invalid SQL syntax",
  },
  DB_UNKNOWN_COLUMN: {
    code: "DB_UNKNOWN_COLUMN",
    statusCode: 500,
    message: "Query references an unknown column",
  },
  DB_WRONG_VALUE_COUNT: {
    code: "DB_WRONG_VALUE_COUNT",
    statusCode: 400,
    message: "Wrong number of values provided for insert/update",
  },
  DB_GENERIC: {
    code: "DB_GENERIC",
    statusCode: 500,
    message: "An unexpected database error occurred",
  },
} as const;

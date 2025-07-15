import { dbErrorCodeRegistery } from "@/common/database/database-error-codes-registery";

export const ErrorCodes = {
  NOT_FOUND: {
    message: "Resource not found",
    statusCode: 404,
    code: "RESOURCE_NOT_FOUND",
  },
  INTERNAL_ERROR: {
    message: "An unexpected error occurred",
    statusCode: 500,
    code: "INTERNAL_ERROR",
  },
  ...dbErrorCodeRegistery,
} as const;

export type ErrorCodeKey = keyof typeof ErrorCodes;

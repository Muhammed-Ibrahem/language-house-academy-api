export interface ErrorResponse {
  code: string;

  message: string;

  statusCode: number;

  timestamp: string;

  stack?: string;

  fields?: Record<string, unknown>[];
}

export interface ErrorCode {
  statusCode: number;
  message: string;
  code: string;
}

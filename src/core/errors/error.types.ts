export interface ErrorResponse {
  code: string;

  message: string;

  statusCode: number;

  timestamp: string;

  stack?: string;

  fields?: Record<string, any>[];
}

export interface ErrorCode {
  statusCode: number;
  message: string;
  code: string;
}

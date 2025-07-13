import { errorHandler } from "./error-handler";
import { NotFoundError } from "../errors/http/not-found-error";
import { Request, Response } from "express";

describe("errorHandler", () => {
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should handle AppError correctly", () => {
    const error = new NotFoundError("User");
    errorHandler(error, {} as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: "RESOURCE_NOT_FOUND",
      message: `User Resource not found`,
      statusCode: 404,
      timestamp: expect.any(String),
    });
  });

  it("should return stack trace on development", () => {
    process.env["NODE_ENV"] = "development";
    const error = new NotFoundError("User");
    errorHandler(error, {} as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ stack: expect.any(String) })
    );
  });

  it("should handle unknown errors in production", () => {
    process.env["NODE_ENV"] = "production";
    const error = new Error("Kaboom!");
    errorHandler(error, {} as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      code: "INTERNAL_ERROR",
      message: `An unexpected error occurred`,
      statusCode: 500,
      timestamp: expect.any(String),
    });
  });

  it("should include stack in development", () => {
    process.env["NODE_ENV"] = "development";
    const error = new Error("Kaboom!");
    errorHandler(error, {} as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ stack: expect.any(String) })
    );
  });

  it("should not include stack for errors that are not instance of 'Error'", () => {
    const error = "never throw a string";
    errorHandler(error, {} as Request, mockRes as Response, mockNext);

    expect(mockRes.json).toHaveBeenCalledWith(
      expect.not.objectContaining({ stack: expect.anything() })
    );
  });
});

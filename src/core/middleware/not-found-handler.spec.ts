import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/http/not-found-error";
import { notFound } from "./not-found-handler";

describe("notFound Middleware", () => {
  it("should throw NotFound Error with route info", () => {
    const mockReq = { method: "GET", path: "/nonexistent" } as Request;

    expect(() => notFound(mockReq, {} as Response, jest.fn() as NextFunction)).toThrow(
      NotFoundError
    );

    try {
      notFound(mockReq, {} as Response, jest.fn() as NextFunction);
    } catch (error: unknown) {
      expect((error as NotFoundError).message).toBe(
        `Route ${mockReq.method} ${mockReq.path} Resource not found`
      );
    }
  });
});

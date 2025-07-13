import { AppError } from "./app-error";

class TestError extends AppError {
  override readonly statusCode = 400;
  override readonly code = "TEST_ERROR";
}

describe("AppError", () => {
  it("should create an instance with correct properties", () => {
    const error = new TestError("Test Message");

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Test Message");
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("TEST_ERROR");
    expect(error.stack).toBeDefined();
  });

  it("should serialize correctly", () => {
    const error = new TestError("Test Message");
    const serialized = error.serialize();

    expect(serialized).toEqual({
      code: "TEST_ERROR",
      message: "Test Message",
      statusCode: 400,
      timestamp: expect.any(String),
      ...(process.env["NODE_ENV"] === "development" && { stack: expect.any(String) }),
    });
  });
});

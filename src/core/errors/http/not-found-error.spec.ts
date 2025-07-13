import { NotFoundError } from "./not-found-error";

describe("NotFoundError", () => {
  it("should have correct default values", () => {
    const error = new NotFoundError("User");

    expect(error.statusCode).toBe(404);
    expect(error.code).toBe("RESOURCE_NOT_FOUND");
    expect(error.message).toBe(`User Resource not found`);
  });

  it("should serialize with development stack", () => {
    process.env["NODE_ENV"] = "development";

    const error = new NotFoundError("User");
    const serialized = error.serialize();

    expect(serialized.stack).toMatch(/NotFoundError/);
  });

  it("should serialize without stack in production", () => {
    process.env["NODE_ENV"] = "production";
    const error = new NotFoundError("User");
    const serialized = error.serialize();

    expect(serialized.stack).toBeUndefined();
  });
});

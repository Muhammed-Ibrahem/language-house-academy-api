import { describe, it, expect, jest } from "@jest/globals";
/**
 * SANITY TEST
 * Verifies that:
 * 1. Jest can run TypeScript tests
 * 2. Basic assertions work
 * 3. Test environment is sane
 */ describe("Sanity Check", () => {
  it("should pass basic math", () => {
    expect(1 + 1).toBe(2);
  });

  it("should handle environment variables", () => {
    expect(process.env["NODE_ENV"]).toBeDefined();
    console.log("Current NODE_ENV:", process.env["NODE_ENV"]);
  });

  it("should verify test runner config", () => {
    expect(jest).toBeDefined();
    expect(expect).toBeDefined();
  });
});

import request from "supertest";
import { describe, it, expect } from "@jest/globals";
import app from "./app";

describe("API Sanity Check", () => {
  it("should start the server and return 200", async () => {
    const response = await request(app).get("/_health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});

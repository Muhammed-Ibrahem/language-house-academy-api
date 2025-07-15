import { DatabaseConnectionError } from "./errors/connection-error";
import { DatabaseQueryError } from "./errors/query-error";
import { Database } from "./database-config";
import { QuerySyntaxError } from "./errors/query-syntax-error";
import * as normalizeUtils from "./utils/normalize-database-errors";
import Logger from "../../core/utils/logger";

const mockConnection = {
  query: jest.fn().mockResolvedValue([[{ result: 2 }]]),
  beginTransaction: jest.fn(),
  commit: jest.fn(),
  rollback: jest.fn(),
  release: jest.fn(),
};

const mockPool = {
  on: jest.fn(),
  getConnection: jest.fn().mockResolvedValue(mockConnection),
  query: jest.fn().mockResolvedValue([[{ result: 2 }]]),
  end: jest.fn(),
};

const createTestDatabase = (pool: any): Database => {
  return new (Database as any)(pool);
};
describe("Database Config", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  afterAll(() => {
    (Database as any)["#instance"] = undefined;
  });

  it("should run a simple query", async () => {
    const db = createTestDatabase(mockPool);
    const result = await db.query("SELECT 1 + 1");

    expect(result).toEqual([{ result: 2 }]);
    expect(mockPool.getConnection).toHaveBeenCalled();
    expect(mockConnection.query).toHaveBeenCalledWith("SELECT 1 + 1", undefined);
    expect(mockConnection.release).toHaveBeenCalled();
  });

  it("should handle transaction success", async () => {
    const db = createTestDatabase(mockPool);
    const result = await db.transaction(async con => {
      await con.query("INSERT INTO test VALUES (?)", [1]);
      return "done";
    });

    expect(result).toBe("done");
    expect(mockConnection.beginTransaction).toHaveBeenCalled();
    expect(mockConnection.commit).toHaveBeenCalled();
    expect(mockConnection.release).toHaveBeenCalled();
  });

  it("should handle transaction failure and rollback", async () => {
    const db = createTestDatabase(mockPool);

    const error = new DatabaseQueryError();

    mockConnection.query.mockRejectedValueOnce(error);

    await expect(
      db.transaction(async con => {
        await con.query("BAD SQL");
      })
    ).rejects.toThrow(error);
  });

  it("should check health", async () => {
    const db = createTestDatabase(mockPool);

    const healthy = await db.isHealthy();
    expect(healthy).toBe(true);
  });
  it("should fail on health check", async () => {
    const db = createTestDatabase(mockPool);

    jest.spyOn(db, "query").mockRejectedValue(new DatabaseQueryError());

    const result = await db.isHealthy();

    expect(result).toBe(false);
  });

  it("should close the pool", async () => {
    const db = createTestDatabase(mockPool);
    await db.close();
    expect(mockPool.end).toHaveBeenCalled();
  });

  it("should throw if getConnection fails", async () => {
    const brokenPool = {
      ...mockPool,
      getConnection: jest.fn().mockRejectedValue(new DatabaseConnectionError()),
    };

    const db = createTestDatabase(brokenPool);
    await expect(db.getConnection()).rejects.toThrow(DatabaseConnectionError);
  });

  it("should normalize and throw on query error", async () => {
    const badConn = {
      query: jest.fn().mockRejectedValue(new QuerySyntaxError("Bad Query")),
      release: jest.fn(),
    };

    const badPool = {
      getConnection: jest.fn().mockResolvedValue(badConn),
      on: jest.fn(),
    };

    const db = createTestDatabase(badPool);

    const normalizedError = new QuerySyntaxError("Normalized");

    jest.spyOn(normalizeUtils, "normalizeError").mockReturnValue(normalizedError);

    await expect(db.query("BAD SQL")).rejects.toThrow("Normalized");

    expect(normalizeUtils.normalizeError).toHaveBeenCalled();
    expect(badConn.release).toHaveBeenCalled();
  });
  it("should set up event listeners", () => {
    const events: Record<string, Function> = {};
    const fakePool = {
      on: jest.fn((event, cb) => {
        events[event] = cb;
      }),
    };
    createTestDatabase(fakePool);

    // Simulate pool events
    events["connection"]?.();
    events["acquire"]?.({ threadId: 1 });
    events["release"]?.({ threadId: 1 });
    events["enqueue"]?.();

    expect(Logger.debug).toHaveBeenCalledWith("New database connection established");
    expect(Logger.debug).toHaveBeenCalledWith("Connection 1 acquired");
    expect(Logger.debug).toHaveBeenCalledWith("Connection 1 released");
    expect(Logger.warn).toHaveBeenCalledWith("Connection request queued due to pool exhaustion");
  });
});

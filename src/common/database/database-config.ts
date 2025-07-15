import { Pool, PoolConnection, PoolOptions } from "mysql2/promise";
import Logger from "@/core/utils/logger";
import { normalizeError } from "./utils/normalize-database-errors";
import { DatabaseConnectionError } from "./errors/connection-error";
import { env } from "../config/env";
import { createPool } from "mysql2/promise";

export interface DatabaseConfig extends PoolOptions {
  host: string;
  user: string;
  password: string;
  waitForConnections?: boolean;
  connectionLimit?: number;
  queueLimit?: number;
}

export const DEFAULT_CONFIG: DatabaseConfig = {
  host: env.dbHost,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

export class Database {
  static #instance: Database;
  #pool: Pool;

  private constructor(pool: Pool) {
    this.#pool = pool;
    this.setupEventListeners();
  }

  public static getInstance(config?: DatabaseConfig, customPool?: Pool): Database {
    if (!Database.#instance) {
      const pool = customPool || createPool(config || DEFAULT_CONFIG);

      Database.#instance = new Database(pool);
    }
    return Database.#instance;
  }

  private setupEventListeners(): void {
    this.#pool.on("connection", () => {
      Logger.debug("New database connection established");
    });

    this.#pool.on("acquire", (connection: PoolConnection) => {
      Logger.debug(`Connection ${connection.threadId} acquired`);
    });

    this.#pool.on("release", (connection: PoolConnection) => {
      Logger.debug(`Connection ${connection.threadId} released`);
    });

    this.#pool.on("enqueue", () => {
      Logger.warn("Connection request queued due to pool exhaustion");
    });
  }

  public async getConnection(): Promise<PoolConnection> {
    try {
      const connection = await this.#pool.getConnection();
      return connection;
    } catch (err) {
      Logger.error("Failed to get database connection:", err);
      throw new DatabaseConnectionError();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<T = any>(sql: string, values?: any[]): Promise<T> {
    let connection;
    try {
      connection = await this.getConnection();
      const [rows] = await connection.query(sql, values);
      return rows as T;
    } catch (err) {
      Logger.error("Database query failed:", {
        sql,
        values: values || [],
        ...(err instanceof Error && { error: err.message }),
      });
      const normalized = normalizeError(err);
      throw normalized;
    } finally {
      connection?.release();
    }
  }

  public async transaction<T>(callback: (conn: PoolConnection) => Promise<T>): Promise<T> {
    const connection = await this.getConnection();
    try {
      await connection.beginTransaction();
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (err) {
      await connection.rollback();
      Logger.error(`Transaction Failed:`);
      const error = normalizeError(err);
      throw error;
    } finally {
      connection.release();
    }
  }

  public async isHealthy(): Promise<boolean> {
    try {
      await this.query("SELECT 1 + 1");
      return true;
    } catch {
      return false;
    }
  }
  public async close(): Promise<void> {
    await this.#pool.end();
    Logger.info("Database pool closed");
  }
}

export const dbInstance = Database.getInstance();

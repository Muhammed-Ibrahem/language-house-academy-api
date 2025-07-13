import expressWinston from "express-winston";
import Logger from "@core-utils/logger";

export const httpLogger = expressWinston.logger({
  winstonInstance: Logger,
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} ({{res.statusCode}} - {{res.responseTime}}ms)",
  expressFormat: true,
  colorize: false,
  ignoreRoute: req => req.url === "/_health",
  statusLevels: false,
  level: (req, res) => {
    if (res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return req.url === "/favicon.ico" ? "debug" : "warn";
    return "info";
  },
  requestWhitelist: ["url", "method", "headers", "query", "body"],
  bodyBlacklist: [],
});

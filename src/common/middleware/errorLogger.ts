import expressWinston from "express-winston";
import Logger from "@core-utils/logger";

export const errorLogger = expressWinston.errorLogger({
  winstonInstance: Logger,
  meta: true,
  msg: "Error: {{err.message}} - {{req.method}} {{req.url}}",
  blacklistedMetaFields: ["password", "creditCard"],
  requestWhitelist: ["url", "method", "headers", "query", "body"],
});

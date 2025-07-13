import { env } from "@config/env";
import app from "./app";
import Logger from "@core-utils/logger";

app.listen(env.port, () => {
  Logger.info(`Server is running on port: ${env.port} in ${process.env["NODE_ENV"]} mode`);
});

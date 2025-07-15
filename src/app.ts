import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { httpLogger } from "@common-middleware/httpLogger";
import { errorLogger } from "@common-middleware/errorLogger";
import { notFound } from "./core/middleware/not-found-handler";
import { errorHandler } from "./core/middleware/error-handler";
import { dbInstance } from "./common/database/database-config";

const app = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(httpLogger);

app.get("/_health", async (_, res) => {
  res.status(200).json({
    status: await dbInstance.isHealthy(),
  });
});

app.use(notFound);

app.use(errorLogger);

app.use(errorHandler);

export default app;

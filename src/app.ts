import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";
import { httpLogger } from "@common-middleware/httpLogger";
import { errorLogger } from "@common-middleware/errorLogger";

const app = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(httpLogger);

app.get("/_health", (_, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use(errorLogger);

export default app;

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import path from "path";

const app = express();

app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/_health", (_, res) => {
  res.status(200).json({
    status: "OK",
  });
});

export default app;

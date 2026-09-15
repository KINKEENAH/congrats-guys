import express from "express";
import cors from "cors";
import "dotenv/config";
import { messagesRouter } from "./routes/messages.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", messagesRouter);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`Congrats system API listening on http://localhost:${port}`);
});
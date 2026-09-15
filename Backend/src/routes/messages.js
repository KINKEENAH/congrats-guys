import { Router } from "express";
import { generateMessage, STYLES } from "../data/messageTemplates.js";

export const messagesRouter = Router();

/**
 * POST /api/messages
 * Body: { name: string, year: number|string, style: "formal" | "emotional" | "funny" }
 */
messagesRouter.post("/messages", async (req, res) => {
  const { name, year, style } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name is required" });
  }

  const yearNum = Number(year);
  if (!Number.isInteger(yearNum) || yearNum < 1950 || yearNum > 2100) {
    return res.status(400).json({ error: "year must be a valid graduation year" });
  }

  if (!STYLES.includes(style)) {
    return res.status(400).json({
      error: `style must be one of: ${STYLES.join(", ")}`,
    });
  }

  try {
    const message = await generateMessage(name.trim(), yearNum, style);
    return res.json({ name: name.trim(), year: yearNum, style, message });
  } catch (err) {
    console.error("POST /api/messages failed:", err);
    return res.status(500).json({ error: "something went wrong" });
  }
});
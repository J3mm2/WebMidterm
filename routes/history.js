import express from "express";
import { getDb } from "../services/db.js";

const router = express.Router();

router.get("/history", async (req, res) => {
  try {
    const { type } = req.query;

    if (type !== "keywords") {
      return res.status(400).json({
        error: "Invalid or missing type. Use /history?type=keywords"
      });
    }

    const db = getDb();

    const keywords = await db
      .collection("SearchHistoryKeyword")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    return res.json(keywords);
  } catch (error) {
    return res.status(500).json({
      error: "Could not retrieve search history"
    });
  }
});

export default router;

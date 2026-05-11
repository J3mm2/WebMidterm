import express from "express";
import { searchEvents, getEventById } from "../services/api.js";
import db from "../services/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({
      error: "Keyword isrequired"
    });
  }

  try {
    // search events using the Ticketmaster API
    const events = await searchEvents(keyword);

    // Format the events for the response   
    const formattedEvents = events.map(event => ({
      display: event.name,
      identifier: event.id
    }));

    // Update the search history in the database
    await db.update(
      "SearchHistoryKeyword",
      { keyword: keyword },
      { keyword: keyword }
    );

    res.json(formattedEvents);

  } catch (error) {
    console.error("Error on request:", error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const event = await getEventById(id);

    res.json(event);
  } catch (error) {
    console.error("Error getting event by ID:", error.message);

    res.status(500).json({
      error: "Failed to get event details"
    });
  }
});


export default router;
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";


// search event by keyword
async function searchEvents(keyword) {
  try {
    
    // Encode the keyword to ensure it's safe for use in a URL
    const url = `${BASE_URL}/events.json?keyword=${encodeURIComponent(keyword)}&apikey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ticketmaster search failed: ${response.status}`);
    }

    const data = await response.json();

    // Return the list of events, or an empty array if no events are found
    return data._embedded?.events || [];

  } catch (error) {
    console.error("Error searching events:", error.message);
    return [];
  }
}

// get event details by id
async function getEventById(eventId) {
  try {
    const url = `${BASE_URL}/events/${eventId}.json?apikey=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ticketmaster get by id failed: ${response.status}`);
    }

    // Return the event details as an object
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error getting event details:", error.message);
    return null;
  }
}

export { searchEvents, getEventById };
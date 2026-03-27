import fs from "fs";
import inquirer from "inquirer";
import dotenv from "dotenv";
import { searchEvents, getEventById } from "./api.js";

// Where we have to load our .env variables
dotenv.config();

const HISTORY_FILE = "./search_history.json";

// search history
function getHistory() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return [];
  }

  const fileData = fs.readFileSync(HISTORY_FILE, "utf-8");
  return JSON.parse(fileData);
}

// Save keyword if not already stored
function saveKeyword(keyword) {
  const history = getHistory();

  if (!history.includes(keyword)) {
    history.push(keyword);
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  }
}

// search flow
export async function handleSearch(keyword) {
  const results = await searchEvents(keyword);

  if (results.length === 0) {
    console.log("No results found.");
    return;
  }

  saveKeyword(keyword);

  const choices = [
    { name: "Exit", value: "exit" },
    ...results.map((event) => ({
      name: event.name,
      value: event.id,
    })),
  ];

  const answer = await inquirer.prompt([
    {
      type: "list",
      name: "eventId",
      message: "Choose an event:",
      choices,
    },
  ]);

  if (answer.eventId === "exit") {
    console.log("Goodbye.");
    return;
  }

  const event = await getEventById(answer.eventId);

  if (!event) {
    console.log("Could not get event details.");
    return;
  }

  console.log("\nEvent Details");
  console.log("-------------");
  console.log("Name:", event.name);
  console.log("Date:", event.dates?.start?.localDate || "N/A");
  console.log("Time:", event.dates?.start?.localTime || "N/A");
  console.log("Venue:", event._embedded?.venues?.[0]?.name || "N/A");
  console.log("City:", event._embedded?.venues?.[0]?.city?.name || "N/A");
  console.log("URL:", event.url || "N/A");
}
import express from "express";
import dotenv from "dotenv";
import * as cors from "cors";

// Load enviornment variables from .env file
dotenv.config();

const app = express();
app.use(cors.default());
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.get("/bluewhale", (req, res) => {
  res.json({
    name: "Blue whale",
    kingdom: "Animalia",
    phylum: "Chordata",
    class: "Mammalia",
    genus: "Balaenoptera",
    lifeSpan: "85 years",
    weight: "200 tons",
  });
});

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});

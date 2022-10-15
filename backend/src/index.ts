import express from "express";
import dotenv from "dotenv";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

// Load enviornment variables from .env file
dotenv.config();

const app = express();

// Middleware (functions that intercept requests)
app.use(cors.default()); // Allows us to connect to the api from any website
app.use(express());
app.use(bodyParser.json()); // Reads the body from a post request properly

const port = process.env.PORT || 8000;

//TODO: Move this to separate file
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

// Not technically all the movies (only the first 50)
app.get("/allmovies", async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: {
        tmdbVoteCount: "desc",
      },
      take: 50,
    });
    return res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not fetch movies from database",
      },
    });
  }
});

app.post("/createmovie", async (req, res) => {
  try {
    // Name is only thing required (see schema.prisma for details)
    console.log(req.body);
    if (!req?.body?.name) {
      console.log("No name provided");
      // 400 is HTTP code for BAD REQUEST
      // Always return when you send data back because you can't run code after a request
      return res.status(400).json({
        error: {
          message: "No name provided",
        },
      });
    }

    const movie = await prisma.movie.create({
      data: {
        title: req.body.title,
        genre: req.body.genre || null,
        description: req.body.description || null,
        posterImageUrl: req.body.posterImageUrl || null,
        releaseDate: req.body.releaseDate || null,
        backdropImageUrl: req.body.backdropImageUrl || null,
      },
    });

    return res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not create new movie",
      },
    });
  }
});

app
  .listen(port, () => {
    console.log(`Backend is running at http://localhost:${port}`);
  })
  .on("error", (error) => {
    console.log(error);
  });

import express, { Request, Response } from "express";
import {
  createMovieHandler,
  getMovieHandler,
} from "../controllers/movie.controller";
import validate from "../middleware/validateRequest";
import { createMovieSchema } from "../schemas/movie.schema";

const movieRouter = express.Router();

// first 50 movies
movieRouter.get("/", getMovieHandler);

movieRouter.post("/", validate(createMovieSchema), createMovieHandler);

export default movieRouter;

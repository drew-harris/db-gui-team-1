import express from "express";
import { createMovieSchema } from "schemas";
import {
  createMovieHandler,
  getMovieHandler,
  getMovieByIdHandler,
} from "../controllers/movie.controller";
import validate from "../middleware/validateRequest";

const movieRouter = express.Router();



movieRouter.get("/", getMovieHandler);

movieRouter.get("/:id", getMovieByIdHandler);

movieRouter.post("/", validate(createMovieSchema, "body"), createMovieHandler);

export default movieRouter;

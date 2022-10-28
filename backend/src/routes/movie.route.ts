import express from "express";
import { createMovieSchema, getMoviesFilterSchema } from "schemas";
import {
  createMovieHandler,
  getMovieHandler,
  getMovieByIdHandler,
} from "../controllers/movie.controller";
import optionalUser from "../middleware/optionalUser";
import validate from "../middleware/validateRequest";

const movieRouter = express.Router();

movieRouter.get(
  "/",
  optionalUser,
  validate(getMoviesFilterSchema, "query"),
  getMovieHandler
);

movieRouter.get("/:id", getMovieByIdHandler);

movieRouter.post("/", validate(createMovieSchema, "body"), createMovieHandler);

export default movieRouter;

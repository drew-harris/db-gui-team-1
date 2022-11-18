import express from "express";
import { createMovieSchema } from "schemas";
import {
  createMovieHandler,
  getMovieByIdHandler,
  getMovieHandler,
  getMovieRankingHandler,
  setListsForMovieHandler,
} from "../controllers/movie.controller";
import optionalUser from "../middleware/optionalUser";
import decodeUser from "../middleware/requireUser";
import validate from "../middleware/validateRequest";

const movieRouter = express.Router();

movieRouter.get("/", optionalUser, getMovieHandler);

movieRouter.get("/ranking/:id", getMovieRankingHandler);

movieRouter.get("/:id", getMovieByIdHandler);

movieRouter.post("/lists/:id", decodeUser, setListsForMovieHandler);

movieRouter.post("/", validate(createMovieSchema, "body"), createMovieHandler);

export default movieRouter;

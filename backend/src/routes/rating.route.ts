import express from "express";
import {
  createRatingHandler,
  deleteRatingByIdHandler,
  getAverageRatingHandler,
  getRatingByIDHandler,
  getRatingHandler,
  updateScoreHandler,
} from "../controllers/rating.controller";
import decodeUser from "../middleware/requireUser";

const ratingRouter = express.Router();

ratingRouter.get("/", getRatingHandler);

ratingRouter.get("/:id", getRatingByIDHandler);

ratingRouter.get("/average/:movieId", getAverageRatingHandler);

ratingRouter.post("/", decodeUser, createRatingHandler);

ratingRouter.delete("/", deleteRatingByIdHandler);

ratingRouter.put("/", updateScoreHandler);

export default ratingRouter;

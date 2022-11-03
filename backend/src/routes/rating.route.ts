import express from "express";
import {
  createRatingHandler,
  getRatingHandler,
  deleteRatingByIdHandler,
  getRatingByUserID,
  updateScoreHandler,
} from "../controllers/rating.controller";
import decodeUser from "../middleware/requireUser";

const ratingRouter = express.Router();

ratingRouter.get("/", getRatingHandler);

ratingRouter.post("/", decodeUser, createRatingHandler);

ratingRouter.delete("/", deleteRatingByIdHandler);

ratingRouter.put("/", updateScoreHandler);

export default ratingRouter;

import express from "express";
import {
  createRatingHandler,
  getRatingHandler,
  // getRatingByIdHandler,
  deleteRatingByIdHandler,
  getRatingByUserID,
} from "../controllers/rating.controller";
import decodeUser from "../middleware/requireUser";

const ratingRouter = express.Router();

ratingRouter.get("/", getRatingHandler);

ratingRouter.post("/", decodeUser, createRatingHandler);

ratingRouter.delete("/", deleteRatingByIdHandler);

export default ratingRouter;

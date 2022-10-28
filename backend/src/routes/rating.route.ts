import express from "express";
import {
  createRatingHandler,
  getRatingHandler,
  getRatingByIdHandler,
} from "../controllers/rating.controller";
import decodeUser from "../middleware/requireUser";

const ratingRouter = express.Router();

ratingRouter.get("/", getRatingHandler);

ratingRouter.post("/", decodeUser, createRatingHandler);

export default ratingRouter;

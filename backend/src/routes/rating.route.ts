import express from "express";
import {
  createRatingHandler,
  getRatingHandler,
} from "../controllers/rating.controller";
import decodeUser from "../middleware/requireUser";
import validate from "../middleware/validateRequest";

const ratingRouter = express.Router();

ratingRouter.get("/", getRatingHandler);

ratingRouter.post("/", decodeUser, createRatingHandler);

export default ratingRouter;

import express from "express";
import {
  createReviewHandler,
  deleteReviewHandler,
  editReviewByIdHandler,
  getReviewHandler,
  recentReviewHandler,
  reviewIdHandler,
} from "../controllers/review.controller";
import validate from "../middleware/validateRequest";

import { createReviewSchema } from "schemas";
import decodeUser from "../middleware/requireUser";
const reviewRouter = express.Router();

reviewRouter.get("/", getReviewHandler);
reviewRouter.get("/recent", recentReviewHandler);

reviewRouter.get("/:id", reviewIdHandler);
reviewRouter.put("/", editReviewByIdHandler);

reviewRouter.post(
  "/",
  validate(createReviewSchema, "body"),
  decodeUser,
  createReviewHandler
);
reviewRouter.post("/delete", decodeUser, deleteReviewHandler);

export default reviewRouter;

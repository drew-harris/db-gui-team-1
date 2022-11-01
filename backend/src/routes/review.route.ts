import express from "express";
import {
  getReviewHandler,
  createReviewHandler,
  editReviewByIdHandler,
  reviewIdHandler,
  deleteReviewHandler,
} from "../controllers/review.controller";
import validate from "../middleware/validateRequest";

import { createReviewSchema, getReviewSchema } from "schemas";
import decodeUser from "../middleware/requireUser";
const reviewRouter = express.Router();

reviewRouter.get("/", validate(getReviewSchema, "query"), getReviewHandler);

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

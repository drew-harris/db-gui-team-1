import express from "express";
import {
  getReviewHandler,
  createReviewHandler,
  editReviewByIdHandler,
} from "../controllers/review.controller";
import validate from "../middleware/validateRequest";

import { createReviewSchema, getReviewSchema } from "schemas";
import decodeUser from "../middleware/requireUser";
const reviewRouter = express.Router();

reviewRouter.get("/", validate(getReviewSchema, "query"), getReviewHandler);

reviewRouter.put("/", editReviewByIdHandler);

reviewRouter.post(
  "/",
  validate(createReviewSchema, "body"),
  decodeUser,
  createReviewHandler
);

export default reviewRouter;

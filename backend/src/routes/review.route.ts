import express from "express";
import {
  getReviewHandler,
  getReviewByIdHandler,
  createReviewHandler,
  editReviewByIdHandler,
} from "../controllers/review.controller";
import validate from "../middleware/validateRequest";

import { createReviewSchema } from "schemas";
import decodeUser from "../middleware/decodeUser";
const reviewRouter = express.Router();


reviewRouter.get("/", getReviewHandler);


reviewRouter.get("/:id", getReviewByIdHandler);

reviewRouter.put("/:id", editReviewByIdHandler);


reviewRouter.post(
  "/",
  validate(createReviewSchema, "body"),
  decodeUser,
  createReviewHandler
);

export default reviewRouter;

import express from "express";
import {
  getReviewHandler,
  getReviewByIdHandler,
  createReviewHandler,
  editReviewByIdHandler,
} from "../controllers/review.controller";
import validate from "../middleware/validateRequest";

import { createReviewSchema } from "schemas";
const reviewRouter = express.Router();

/**
 * @openapi
 * /api/reviews:
 *  get:
 *   tags:
 *   - Review
 *   summary: Get all reviews
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetAllReviewsResponse'
 *    500:
 *     description: Could not fetch reviews
 */

reviewRouter.get("/", getReviewHandler);

/**
 * @openapi
 * /api/reviews/{id}:
 *  get:
 *   tags:
 *   - Review
 *   summary: Get a review
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateReviewResponse'
 *    500:
 *     description: Could not fetch review
 */

reviewRouter.get("/:id", getReviewByIdHandler);
/**
 * @openapi
 * /api/reviews/{id}:
 *  put:
 *   tags:
 *   - Review
 *   summary: Edit review
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateReviewInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/EditReviewResponse'
 *    500:
 *     description: Could not create new review
 */
reviewRouter.put("/:id", editReviewByIdHandler);
/**
 * @openapi
 * /api/reviews:
 *  post:
 *   tags:
 *   - Review
 *   summary: Create review
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateReviewInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateReviewResponse'
 *    500:
 *     description: Could not create new review
 */

reviewRouter.post("/", validate(createReviewSchema), createReviewHandler);

export default reviewRouter;

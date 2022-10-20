import express from "express";
import {
  getReviewHandler,
  getReviewByIdHandler, createReviewHandler
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
 *   summary: Return reviews
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/FetchAllReviewsResponse'
 *    500:
 *     description: Could not fetch reviews
 */

reviewRouter.get("/", getReviewHandler);

/**
 * @openapi
 * /api/reviews/:id:
 *  get:
 *   tags:
 *   - Review
 *   summary: Return specific review
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


reviewRouter.post("/", validate(createReviewSchema),createReviewHandler);

export default reviewRouter;

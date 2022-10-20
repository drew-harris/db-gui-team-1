import express, { Request, Response } from "express";
import {
  createMovieHandler,
  getMovieHandler,
} from "../controllers/movie.controller";
import validate from "../middleware/validateRequest";
import { createMovieSchema } from "../schemas/movie.schema";

const movieRouter = express.Router();

// first 50 movies

/**
 * @openapi
 * /api/movies:
 *  get:
 *   tags:
 *   - Movie
 *   summary: Return movies
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/FetchAllMoviesResponse'
 *    500:
 *     description: Could not fetch movies
 */

movieRouter.get("/", getMovieHandler);

/**
 * @openapi
 * /api/movies:
 *  post:
 *   tags:
 *   - Movie
 *   summary: Create movie
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateMovieInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateMovieResponse'
 *    500:
 *     description: Could not create new movie
 */

movieRouter.post("/", validate(createMovieSchema), createMovieHandler);

export default movieRouter;

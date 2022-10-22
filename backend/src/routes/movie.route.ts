import express from "express";
import { createMovieSchema } from "schemas";
import {
  createMovieHandler,
  getMovieHandler,
  getMovieByIdHandler,
} from "../controllers/movie.controller";
import validate from "../middleware/validateRequest";

const movieRouter = express.Router();

// first 50 movies

/**
 * @openapi
 * /api/movies:
 *  get:
 *   tags:
 *   - Movie
 *   summary: Get all movies
 *   parameters:
 *    - in: query
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetAllMoviesResponse'
 *    500:
 *     description: Could not fetch movies
 */

/**
 * @openapi
 * /api/movies/title?={name}:
 *  get:
 *   tags:
 *   - Movie
 *   summary: Get a movie
 *   parameters:
 *    - in: query
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateMovieResponse'
 *    500:
 *     description: Could not get movie
 */

movieRouter.get("/", getMovieHandler);

/**
 * @openapi
 * /api/movies/{id}:
 *  get:
 *   tags:
 *   - Movie
 *   summary: Get a movie
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateMovieResponse'
 *    500:
 *     description: Could not get movie
 */

movieRouter.get("/:id", getMovieByIdHandler);
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

import express, { Request, Response }from 'express'
import {createMovieHandler, getMovieHandler} from '../controllers/movie.controller'

const movieRouter = express.Router()

// first 50 movies
movieRouter.get("/", getMovieHandler);

movieRouter.post("/", createMovieHandler);

export default movieRouter
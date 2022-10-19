import { Request, Response }from 'express'
import { createMovie, getMovies } from '../services/movie.service';

export async function createMovieHandler(req: Request, res: Response) {
    try {
    
        const movie = await createMovie(req.body)
    
        return res.json(movie);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: {
            error: error.message,
            message: "Could not create new movie",
          },
        });
      }
}
export async function getMovieHandler(req: Request, res: Response) {
    try {
        const movies = await getMovies()
        return res.json(movies);
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: {
            error: error.message,
            message: "Could not fetch movies from database",
          },
        });
      }
}
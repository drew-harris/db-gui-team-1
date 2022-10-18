import { Request, Response }from 'express'
import { createMovie, getMovies } from '../services/movie.service';

export async function createMovieHandler(req: Request, res: Response) {
    try {
        // Name is only thing required (see schema.prisma for details)
        console.log(req.body);
        if (!req?.body?.title) {
          console.log("No name provided");
          // 400 is HTTP code for BAD REQUEST
          // Always return when you send data back because you can't run code after a request
          return res.status(400).json({
            error: {
              message: "No name provided",
            },
          });
        }
    
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
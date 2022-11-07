import { Request, Response } from "express";
import {
  createMovie,
  get100Movies,
  getMovieById,
  filterMovies,
} from "../services/movie.service";
import prisma from "../utils/prisma.util";

export async function getMovieHandler(req, res: Response) {
  try {
    if (!res.locals.valid) {
      const movies = await get100Movies();
      return res.json(movies);
    }

    const filterBody = {
      page: +req.query.page,
      title: req.query.title,
      genre: req.query.genre,
      date: {
        from: req.query.fromDate,
        to: req.query.toDate,
      },
      tmdb: {
        low: req.query.tmdbLow,
        high: req.query.tmdbHigh,
      },
      runtime: {
        begin: +req.query.runTimeBegin,
        end: +req.query.runTimeEnd,
      },
      sortUp: req.query.sortUp,
      sortDown: req.query.sortDown,
    };

    const movies = await filterMovies(filterBody);

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
export async function getMovieByIdHandler(req, res: Response) {
  try {
    const movie = await getMovieById(+req.params.id);
    return res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not get movie",
      },
    });
  }
}
export async function createMovieHandler(req: Request, res: Response) {
  try {
    const movie = await createMovie(req.body);

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

export async function getGenresHandler(req, res) {
  try {
    const genres = await prisma.movie.groupBy({
      by: ["genre"],
      orderBy: {
        _count: {
          genre: "desc",
        },
      },
    });

    res.json(genres.map((result) => result.genre));
  } catch (error) {
    return res.status(500).json({
      error: {
        message: "There was an error fetching movie genres",
      },
    });
  }
}

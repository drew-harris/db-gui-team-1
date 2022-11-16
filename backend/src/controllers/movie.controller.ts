import { Request, Response } from "express";
import { createMovie } from "../services/movie.service";
import prisma from "../utils/prisma.util";

export async function getMovieHandler(req, res: Response) {
  try {
    const limit = parseInt(req.query.limit || 24);

    const sensibleDefaults = {
      ratings: {
        ratings: {
          _count: "desc",
        },
      },

      reviews: {
        reviews: {
          _count: "desc",
        },
      },

      popularity: {
        tmdbVoteCount: "desc",
      },

      runtime: {
        runTime: "desc",
      },
    };

    if (
      req.query.sortBy &&
      !Object.keys(sensibleDefaults).includes(req.query.sortBy)
    ) {
      return res.status(401).json({
        error: {
          message: "Invalid sort field",
        },
      });
    }
    console.log(req.query);
    const movies = await prisma.movie.findMany({
      where: {
        id: req.query.id,
        genre: req.query.genre !== "null" ? req.query.genre : undefined,
        releaseDate: req.query.minDate
          ? {
              gt: new Date(req.query.minDate),
            }
          : undefined,
        runTime: req.query.minRuntime
          ? {
              gt: parseInt(req.query.minRuntime),
            }
          : undefined,

        title: req.query.title
          ? {
              contains: req.query.title,
            }
          : undefined,
      },
      take: limit,
      skip: req.query.page ? (parseInt(req.query.page) - 1) * limit : 0,
      orderBy: req.query.sortBy
        ? sensibleDefaults[req.query.sortBy]
        : { tmdbVoteCount: "desc" },
      include: {
        _count: {
          select: {
            ratings: true,
            reviews: true,
          },
        },
      },
    });

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
    const ident = req.params.id;
    const movies = await prisma.movie.findUnique({
      where: {
        id: ident,
      },
    });
    return res.json(movies);
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

export async function getMovieRankingHandler(req, res: Response) {
  try {
    const movie = await prisma.movie.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!movie) {
      return res.status(400).json({
        error: {
          message: "No movie with that id",
        },
      });
    }
    const ranking = await prisma.rating.groupBy({
      by: ["movieId"],
      _avg: {
        score: true,
      },
      orderBy: {
        _avg: {
          score: "desc",
        },
      },
    });
    const orderedIds = ranking.map((ratingGroup) => ratingGroup.movieId);
    res.json(orderedIds.indexOf(movie.id) + 1);
  } catch (error) {
    res.status(500).json({
      error: {
        error: error,
        message: "Could not get ranking",
      },
    });
  }
}

export async function setListsForMovieHandler(req, res) {
  try {
    const listIds = req.body.listIds as string[];
    const movieId = req.params.id;
    console.log("LISTS: ", listIds);
    const connectField = listIds.map((id) => ({ id: id }));
    const newMovie = await prisma.movie.update({
      where: {
        id: movieId,
      },
      data: {
        inLists: { set: connectField },
      },
    });
    return res.json(newMovie);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: {
        message: "Error setting lists for movie",
      },
    });
  }
}

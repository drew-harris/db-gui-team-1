import { Response } from "express";
import {
  createRating,
  deleteRatingById,
  getRatingById,
  updateMovieScore,
} from "../services/rating.service";
import prisma from "../utils/prisma.util";
import { addMovieFromRating } from "./list.controller";

export async function createRatingHandler(req, res: Response) {
  try {
    const rating = await createRating(req.body, req.user);
    return res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not create new rating",
      },
    });
  }
}

export async function getAverageRatingHandler(req, res: Response) {
  try {
    const id = req.params.movieId;
    const aggregations = await prisma.rating.aggregate({
      _avg: {
        score: true,
      },
      _count: true,
      where: {
        movieId: id,
      },
    });
    res.json({ average: aggregations._avg.score, count: aggregations._count });
  } catch (error) {
    return res.status(500).json({
      error: {
        error: error.message,
        message: "Could not get average rating",
      },
    });
  }
}

export async function getRatingByIDHandler(req, res: Response) {
  try {
    const ident = req.params.id;
    const ratings = await prisma.rating.findUnique({
      where: {
        id: ident,
      },
    });
    return res.json(ratings);
  } catch (error) {
    return res.status(500).json({
      error: {
        error: error.message,
        message: "Could not find rating (id might not exist)",
      },
    });
  }
}

export async function getRatingHandler(req, res: Response) {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        id: req.query.id,
        movieId: req.query.movieId,
        userId: req.query.userId,
      },
      include: {
        by: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
    return res.json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not fetch ratings from database",
      },
    });
  }
}

export async function getRatingByUserID(req, res: Response) {
  try {
    const rating = await getRatingById(req.query.userID);
    return res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not get rating",
      },
    });
  }
}

export async function deleteRatingByIdHandler(req, res: Response) {
  try {
    const rating = await deleteRatingById(req.query.id);
    return res.json(rating);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not get rating",
      },
    });
  }
}

export async function updateScoreHandler(req, res: Response) {
  if (!req.body.movieId) {
    return res.status(400).json({
      error: {
        message: "No movieid given",
      },
    });
  }

  try {
    const rating = await prisma.rating.findFirst({
      where: {
        movieId: req.body.movieId,
        userId: req.user.id,
      },
    });

    let newRating;
    if (rating) {
      newRating = await prisma.rating.update({
        where: {
          id: rating.id,
        },
        data: {
          score: req.body.score || 0,
          submittedAt: new Date(),
        },
      });
    } else {
      newRating = await prisma.rating.create({
        data: {
          for: {
            connect: {
              id: req.body.movieId,
            },
          },
          score: req.body.score,
          by: {
            connect: {
              id: req.user.id,
            },
          },
        },
      });
    }
    addMovieFromRating(req.body.movieId, req.user.id);
    console.log(newRating);
    return res.json(newRating);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not update rating",
      },
    });
  }
}

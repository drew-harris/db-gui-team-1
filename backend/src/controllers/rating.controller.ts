import { Request, Response } from "express";
import {
  getRatings,
  getRatingById,
  createRating,
  deleteRatingById,
  getRatingByUser,
  getAllMoviesRatingsByUser,
  getAverage,
  updateMovieScore,
} from "../services/rating.service";
import prisma from "../utils/prisma.util";

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
        movieId: +id,
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

export async function getRatingHandler(req, res: Response) {
  try {
    const ratings = await prisma.rating.findMany({
      where: {
        id: req.query.id,
        movieId: req.query.movieId ? parseInt(req.query.movieId) : undefined,
        userId: req.query.userId,
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
  try {
    const rating = await updateMovieScore(req.query.id, +req.query.score);
    return res.json(rating);
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

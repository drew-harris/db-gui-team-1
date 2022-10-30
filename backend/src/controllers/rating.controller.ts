import { Request, Response } from "express";
import {
  getRatings,
  getRatingById,
  createRating,
} from "../services/rating.service";

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

export async function getRatingHandler(req, res: Response) {
  try {
    if (req.query.movieId) {
      const rating = await getRatingById(+req.query.movieId);
      return res.json(rating);
    }
    const rating = await getRatings();
    return res.json(rating);
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

export async function getRatingByIdHandler(req, res: Response) {
  try {
    const rating = await getRatingById(+req.query.movieId);
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

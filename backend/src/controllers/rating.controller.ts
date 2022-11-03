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
    const average = req.params.movieId;
    const rating = await getAverage(average);
    res.json({ average: rating });
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
    if (req.query.movieId) {
      if (!req.query.userID) {
        if (!req.query.score) {
          //Get Ratings by ID
          const rating = await getRatingById(+req.query.movieId);
          return res.json(rating);
        } else {
          //Get Average
          const rating = await getAverage(req);
          return res.json(rating);
        }
      } else {
        //Get all ratings of a certain movie by a user
        const rating = await getAllMoviesRatingsByUser(
          +req.query.movieId,
          req.query.userID
        );
        return res.json(rating);
      }
    } else if (req.query.userID) {
      //Get all ratings by a user
      const rating = await getRatingByUser(req.query.userID);
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

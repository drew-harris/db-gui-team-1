import { Request, Response } from "express";
import {
  createReview,
  getReviews,
  getReviewById,
  editReview,
  getReviewByMovieId,
} from "../services/review.service";

export async function createReviewHandler(req, res: Response) {
  try {
    const reviewBody = {
      userId: req.user.id,
      ...req.body,
    };
    const review = await createReview(reviewBody);

    return res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not create new review",
      },
    });
  }
}

export async function getReviewHandler(req: Request, res: Response) {
  try {
    if (req.query.movieId) {
      const reviews = await getReviewByMovieId(+req.query.movieId);
      return res.json(reviews);
    }
    if (req.query.id) {
      const reviews = await getReviewById(req.query.id);
      return res.json(reviews);
    }
    const reviews = await getReviews();
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not get reviews",
      },
    });
  }
}
export async function editReviewByIdHandler(req, res: Response) {
  try {
    const review = await editReview(req.query.id, req.body.content);
    return res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not edit review",
      },
    });
  }
}

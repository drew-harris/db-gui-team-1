import { Request, Response } from "express";
import { createReview, getReviews, getReviewById, editReview } from "../services/review.service";

export async function createReviewHandler(req: Request, res: Response) {
    try {
      const movie = await createReview(req.body);
  
      return res.json(movie);
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
    const reviews = await getReviews();
    return res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not fetch reviews from database",
      },
    });
  }
}
export async function editReviewByIdHandler(req, res: Response) {
  try {
    const review = await editReview(req.params.id, req.body.content);
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

export async function getReviewByIdHandler(req: Request, res: Response) {
  try {
    const review = await getReviewById(req.params.id);
    return res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: {
        error: error.message,
        message: "Could not fetch review from database",
      },
    });
  }
}

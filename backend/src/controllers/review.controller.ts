import { Response } from "express";
import { createReview, editReview } from "../services/review.service";
import prisma from "../utils/prisma.util";

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

export async function getReviewHandler(req, res: Response) {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        movieId: req.query.movieId,

        userId: req.query.userId,
      },
      take: req.query.limit ? parseInt(req.query.limit) : undefined,
      include: {
        // Include user with each review
        by: {
          select: {
            id: true,
            username: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });
    res.json(reviews);
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

export async function deleteReviewHandler(req, res) {
  try {
    const movieDelete = await prisma.movieRequest.findFirst({
      where: {
        id: req.body.id,
      },
    });

    if (movieDelete.userId != req.user.id) {
      res.status(401).json({
        error: {
          message: "Access denied: You do not own this review",
        },
      });
    }
    await prisma.review.delete({
      where: {
        id: req.body.id,
      },
    });
    return res.json(movieDelete);
  } catch (error) {
    res.status(500).json({
      error: {
        message: "Error deleting review",
      },
    });
  }
}

export async function reviewIdHandler(req, res) {
  try {
    if (!req.params.id) {
      throw new Error("No id provided");
    }
    const review = await prisma.review.findFirst({
      where: {
        id: req.params.id,
      },
    });
    res.json(review);
  } catch (error) {
    res.status(500).json({
      error: {
        error,
        message: "Error getting review",
      },
    });
  }
}

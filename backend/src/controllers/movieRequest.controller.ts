import { Request, Response } from "express";
import prisma from "../utils/prisma.util";

export async function handleNewMovieRequest(req, res: Response) {
  console.log(req.body);
  try {
    const movieRequest = await prisma.movieRequest.create({
      data: {
        title: req.body.title,
        user: {
          connect: {
            id: req.user.id,
          },
        },
        message: req.body.message || null,
      },
    });

    res.json(movieRequest);
  } catch (error) {
    res.status(500).json({
      error: error,
      message: "Failed to create movie request",
    });
  }
}

export async function getMyRequests(req, res) {
  try {
    const requests = await prisma.movieRequest.findMany({
      where: {
        user: {
          id: req.user.id,
        },
      },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get movie requests",
    });
  }
}

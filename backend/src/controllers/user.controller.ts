import { Request, Response } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  editBio,
  editImage,
} from "../services/user.service";
import prisma from "../utils/prisma.util";
import { getReviewByUserId } from "../services/review.service";
import { signJwt } from "../utils/jwt.util";
import { getRatingByUser } from "../services/rating.service";
export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    const jwt = await signJwt(user);

    return res.cookie("jwt", jwt).json({ user, jwt });
  } catch (e) {
    if (e.code === 409) {
      return res.status(409).json({
        error: {
          message: e.message,
        },
      });
    }
    return res.status(400).json({
      error: {
        message: e.message,
      },
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany({
      where: {
        id: req.query.id?.toString(),
        username: req.query.username?.toString(),
      },
    });

    return res.json(user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function editBioHandler(req, res: Response) {
  try {
    const bio = req.body.bio;
    const userId = req.user.id;
    const user = await editBio(userId, bio);

    return res.json(user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function editImageHandler(req, res: Response) {
  try {
    const profileImageUrl = req.body.profileImageUrl;
    const userId = req.user.id;
    const user = await editImage(userId, profileImageUrl);

    return res.json(user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function getUserOverviewHandler(req, res: Response) {
  try {
    if (!req.query.id) {
      return res.status(400).json({
        message: "Missing id",
      });
    }
    const userId = req.query.id || req.user.id;

    const user = await getUserById(userId);
    const reviews = await getReviewByUserId(userId);
    const ratings = await getRatingByUser(userId);

    const userOverview = {
      user,
      reviews,
      ratings,
    };
    return res.json(userOverview);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

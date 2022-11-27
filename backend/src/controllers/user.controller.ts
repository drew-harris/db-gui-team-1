import { Request, Response } from "express";
import { getRatingByUser } from "../services/rating.service";
import { getReviewByUserId } from "../services/review.service";
import { createUser, editProfile, getUserById } from "../services/user.service";
import { signJwt } from "../utils/jwt.util";
import prisma from "../utils/prisma.util";
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
    const users = await prisma.user.findMany({
      where: {
        id: req.query.id?.toString() || undefined,
        username: req.query.search
          ? {
              contains: req.query.search.toString(),
            }
          : undefined,
      },
    });

    return res.json(users);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function editProfileHandler(req, res: Response) {
  console.log("Editing a profile with", req.body);
  try {
    const bio = req.body.bio;
    const profileImageUrl = req.body.profileImageUrl;
    const userId = req.user.id;
    const user = await editProfile(userId, bio, profileImageUrl);

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

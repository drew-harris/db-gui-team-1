import { Request, Response } from "express";
import { createUser, getUserById, getUsers } from "../services/user.service";
import {getReviewByUserId} from "../services/review.service"
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
        message: e.message,
      });
    }
    return res.status(400).json({
      message: e.message,
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    if (req.query.id) {
      const user = await getUserById(req.query.id);

      return res.json(user);
    }
    const user = await getUsers();

    return res.json(user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}
export async function getUserOverviewHandler(req, res: Response) {
  try {
   
    const userId = req.user.id

    const user = await getUserById(userId);
    const reviews = await getReviewByUserId(userId)
    const ratings = await getRatingByUser(userId)

    const userOverview = {
      user,
      reviews,
      ratings
    }
    return res.json(userOverview);

  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}


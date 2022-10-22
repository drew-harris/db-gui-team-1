import { Request, Response } from "express";
import { createUser, getUserById, getUsers } from "../services/user.service";
import { signJwt } from "../utils/jwt.util";
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
    const user = await getUsers();

    return res.json(user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
}

export async function getUserByIdHandler(req: Request, res: Response) {
  try {
    const user = await getUserById(req.params.id);

    return res.json(user);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: e.message,
    });
  }
}

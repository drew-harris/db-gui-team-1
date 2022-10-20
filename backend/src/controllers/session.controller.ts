import { Request, Response } from "express";
import { findUserByEmail, validateUser } from "../services/user.service";
import { signJwt, verifyJWT } from "../utils/jwt.util";

export async function createSessionHandler(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).json({
        message: "Email or password not valid",
      });
    }

    const isValid = await validateUser(req.body.password, user.password);
    if (!isValid) {
      return res.status(404).json({
        message: "Email or password not valid",
      });
    }

    const accessToken = signJwt({ id: user.id });

    return res.status(201).json({ accessToken });
  } catch (e) {
    res.status(400).json({
      e,
    });
  }
}

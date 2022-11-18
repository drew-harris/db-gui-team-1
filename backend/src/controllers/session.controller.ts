import { Request, Response } from "express";
import { findUserByEmail, validateUser } from "../services/user.service";
import { signJwt } from "../utils/jwt.util";

export async function createSessionHandler(req: Request, res: Response) {
  try {
    const user = await findUserByEmail(req.body.email);

    if (!user) {
      return res.status(401).json({
        error: {
          message: "Email or password not valid",
        },
      });
    }

    const isValid = await validateUser(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({
        error: {
          message: "Email or password not valid",
        },
      });
    }

    const { password, ...userWithoutPassword } = user;

    const jwt = signJwt(userWithoutPassword);

    return res
      .status(201)
      .cookie("jwt", jwt)
      .json({ jwt: jwt, user: userWithoutPassword });
  } catch (e) {
    res.status(400).json({
      e: e.message,
    });
  }
}

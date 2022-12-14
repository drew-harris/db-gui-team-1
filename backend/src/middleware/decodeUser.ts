import { NextFunction, Response } from "express";
import { verifyJWT } from "../utils/jwt.util";

export default function decodeUser(req, res: Response, next: NextFunction) {
  const accessToken: string = req.headers.jwt;

  const validToken = verifyJWT(accessToken);

  if (!validToken.valid) {
    return res.status(403).json({
      message: "Invalid access token",
    });
  }

  req.user = validToken.decoded;

  next();
}

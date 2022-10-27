import { verifyJWT } from "../utils/jwt.util";
import { Request, Response, NextFunction } from "express";

export default function optionalUser(req, res: Response, next: NextFunction) {
  const accessToken: string = req.headers.jwt;

  const validToken = verifyJWT(accessToken);

  if (!validToken.valid) {
    res.locals.valid = false;
  } else {
    res.locals.valid = true;
  }

  next();
}

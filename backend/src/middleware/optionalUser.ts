import { NextFunction, Response } from "express";
import { verifyJWT } from "../utils/jwt.util";

export default function optionalUser(req, res: Response, next: NextFunction) {
  const accessToken: string = req.headers.jwt;

  const validToken = verifyJWT(accessToken);

  if (!validToken.valid) {
    res.locals.valid = false;
  } else {
    res.locals.valid = true;
    req.user = validToken.decoded;
  }

  next();
}

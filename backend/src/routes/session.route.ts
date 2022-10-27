import express from "express";
import { createSessionSchema } from "schemas";
import { createSessionHandler } from "../controllers/session.controller";
import validate from "../middleware/validateRequest";

const sessionRouter = express.Router();

sessionRouter.post(
  "/",
  validate(createSessionSchema, "body"),
  createSessionHandler
);

export default sessionRouter;

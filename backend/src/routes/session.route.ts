import express, { Request, Response } from "express";
import { createSessionHandler } from "../controllers/session.controller";
import validate from "../middleware/validateRequest";
import { createSessionSchema } from "../schemas/session.schema";

const sessionRouter = express.Router();

sessionRouter.post("/", validate(createSessionSchema), createSessionHandler);

export default sessionRouter;

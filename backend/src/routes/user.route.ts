import express, { Request, Response } from "express";
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import validate from "../middleware/validateRequest";
import { createUserSchema } from "../schemas/user.schema";
const userRouter = express.Router();

userRouter.post("/", validate(createUserSchema), createUserHandler);

userRouter.get("/", getUsersHandler);

userRouter.get("/:id", getUserByIdHandler);

export default userRouter;

import express from "express";
import { createUserSchema } from "schemas";
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import validate from "../middleware/validateRequest";
const userRouter = express.Router();

userRouter.post("/", validate(createUserSchema, "body"), createUserHandler);

userRouter.get("/", getUsersHandler);

userRouter.get("/:id", getUserByIdHandler);

export default userRouter;

import express from "express";
import { createUserSchema } from "schemas";
import {
  createUserHandler,
  getUsersHandler, getUserOverviewHandler
} from "../controllers/user.controller";
import validate from "../middleware/validateRequest";
import decodeUser from "../middleware/requireUser";
const userRouter = express.Router();

userRouter.post("/", validate(createUserSchema, "body"), createUserHandler);

userRouter.get("/", getUsersHandler);
userRouter.get("/about", decodeUser, getUserOverviewHandler);

export default userRouter;

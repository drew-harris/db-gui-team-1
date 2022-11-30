import express from "express";
import { createUserSchema, editProfileSchema } from "schemas";
import {
  createUserHandler,
  editProfileHandler,
  getUserOverviewHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import optionalUser from "../middleware/optionalUser";
import decodeUser from "../middleware/requireUser";
import validate from "../middleware/validateRequest";
const userRouter = express.Router();

userRouter.post("/", validate(createUserSchema, "body"), createUserHandler);

userRouter.get("/", getUsersHandler);
userRouter.get("/about", optionalUser, getUserOverviewHandler);
userRouter.put(
  "/",
  validate(editProfileSchema, "body"),
  decodeUser,
  editProfileHandler
);

export default userRouter;

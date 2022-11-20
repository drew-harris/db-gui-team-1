import express from "express";
import { createUserSchema, editBioSchema, editPfpSchema } from "schemas";
import {
  createUserHandler,
  editBioHandler,
  editImageHandler,
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
  "/bio",
  validate(editBioSchema, "body"),
  decodeUser,
  editBioHandler
);
userRouter.put(
  "/pfp",
  validate(editPfpSchema, "body"),
  decodeUser,
  editImageHandler
);

export default userRouter;

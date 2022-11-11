import express from "express";
import decodeUser from "../middleware/requireUser";
import {
  createListHandler,
  deleteListHandler,
  getListHandler,
} from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

listRouter.get("/", decodeUser, getListHandler);

listRouter.delete("/", decodeUser, deleteListHandler);

export default listRouter;

import express from "express";
import decodeUser from "../middleware/requireUser";
import {
  createListHandler,
  deleteListHandler,
  getListHandler,
  addToMovieListHandler,
  getMoviesInList,
} from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

listRouter.get("/", decodeUser, getListHandler);

listRouter.get("/:id", decodeUser, getMoviesInList);

listRouter.delete("/", decodeUser, deleteListHandler);

listRouter.put("/add/", decodeUser, addToMovieListHandler);

export default listRouter;

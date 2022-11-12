import express from "express";
import decodeUser from "../middleware/requireUser";
import {
  createListHandler,
  deleteListHandler,
  getListHandler,
  addToMovieListHandler,
  getMoviesInList,
  removeFromMovieListHandler,
} from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

listRouter.get("/", decodeUser, getListHandler);

listRouter.get("/:id", decodeUser, getMoviesInList);

listRouter.delete("/", decodeUser, deleteListHandler);

listRouter.put("/add/", decodeUser, addToMovieListHandler);

listRouter.put("/remove/", decodeUser, removeFromMovieListHandler);

export default listRouter;

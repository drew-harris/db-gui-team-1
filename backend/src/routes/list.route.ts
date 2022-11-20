import express from "express";
import {
  addToMovieListHandler,
  createListHandler,
  deleteListHandler,
  getListHandler,
  getMoviesInList,
  removeFromMovieListHandler,
} from "../controllers/list.controller";
import optionalUser from "../middleware/optionalUser";
import decodeUser from "../middleware/requireUser";

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

listRouter.get("/", optionalUser, getListHandler);

listRouter.get("/:id", decodeUser, getMoviesInList);

listRouter.delete("/", decodeUser, deleteListHandler);

listRouter.put("/add/", decodeUser, addToMovieListHandler);

listRouter.put("/remove/", decodeUser, removeFromMovieListHandler);

export default listRouter;

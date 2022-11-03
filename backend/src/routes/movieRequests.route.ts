import express from "express";
import {
  getMyRequests,
  handleNewMovieRequest,
} from "../controllers/movieRequest.controller";
import decodeUser from "../middleware/requireUser";
export const movieRequestRouter = express.Router();

movieRequestRouter.post("/", decodeUser, handleNewMovieRequest);

movieRequestRouter.get("/", decodeUser, getMyRequests);

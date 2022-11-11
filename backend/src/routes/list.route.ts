import express from "express";
import decodeUser from "../middleware/requireUser";
import { createListHandler,
getListHandler } from "../controllers/list.controller";

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

listRouter.get("/", decodeUser, getListHandler);

export default listRouter;

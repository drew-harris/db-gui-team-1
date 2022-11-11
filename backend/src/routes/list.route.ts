import express from "express";
import decodeUser from "../middleware/requireUser";
import {
    createListHandler,
} from "../controllers/list.controller"

const listRouter = express.Router();

listRouter.post("/", decodeUser, createListHandler);

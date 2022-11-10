import express from "express";
import {
    createList,
    getList,
} from "../controllers/list.controller";
import decodeUser from "../middleware/requireUser";

const listRouter = express.Router();

listRouter.get("/", getList);
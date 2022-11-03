import express from "express";
import { sayHello } from "../controllers/hello.controller";

const helloRouter = express.Router();

helloRouter.get("/", sayHello);

export default helloRouter;

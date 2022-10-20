import express, { Request, Response } from "express";
import { createSessionHandler } from "../controllers/session.controller";
import validate from "../middleware/validateRequest";
import { createSessionSchema } from "../schemas/session.schema";

const sessionRouter = express.Router();

/**
 * @openapi
 * /api/sessions:
 *  post:
 *   tags:
 *   - Session
 *   summary: Create session
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateSessionInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateSessionResponse'
 *    400:
 *     description: Bad request
 *    404:
 *     description: Email or password not valid

 */

sessionRouter.post("/", validate(createSessionSchema), createSessionHandler);

export default sessionRouter;

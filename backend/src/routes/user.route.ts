import express from "express";
import { createUserSchema } from "schemas";
import {
  createUserHandler,
  getUserByIdHandler,
  getUsersHandler,
} from "../controllers/user.controller";
import validate from "../middleware/validateRequest";
const userRouter = express.Router();

/**
 * @openapi
 * /api/users:
 *  post:
 *   tags:
 *   - User
 *   summary: Create user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateUserInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateUserResponse'
 *    400:
 *     description: Bad request
 *    409:
 *     description: User exists

 */

userRouter.post("/", validate(createUserSchema), createUserHandler);

/**
 * @openapi
 * /api/users:
 *  get:
 *   tags:
 *   - User
 *   summary: Return users
 *   responses:
 *    200:
 *     description:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/FetchAllUsersResponse'
 *    500:
 *     description: Could not fetch users
 *
 */

userRouter.get("/", getUsersHandler);

/**
 * @openapi
 * /api/users/:id:
 *  get:
 *   tags:
 *   - User
 *   summary: Return specific user
 *   responses:
 *    200:
 *     description:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateUserResponse'
 *    500:
 *     description: Could not fetch users
 */

userRouter.get("/:id", getUserByIdHandler);

export default userRouter;

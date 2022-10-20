import { object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *     type: object
 *     required:
 *     - username
 *     - email
 *     - password
 *     - passwordConfirmation
 *     properties:
 *      username:
 *       type: string
 *       default: johndoereviews
 *      email:
 *       type: string
 *       default: johndoe@gmail.com
 *      password:
 *       type: string
 *       default: mypassword12345
 *      passwordConfirmation:
 *       type: string
 *       default: mypassword12345
 *    CreateUserResponse:
 *     type: object
 *     properties:
 *      id:
 *       type: string
 *      username:
 *       type: string
 *      email:
 *       type: string
 *      createdAt:
 *       type: string
 *    FetchAllUsersResponse:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *       username:
 *        type: string
 *       email:
 *        type: string
 *       createdAt:
 *        type: string
 */

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password too short - should be 8 chars minimum"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

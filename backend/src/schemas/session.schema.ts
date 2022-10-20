import { object, string } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateSessionInput:
 *     type: object
 *     required:
 *     - email
 *     - password
 *     properties:
 *      email:
 *       type: string
 *       default: johndoe@gmail.com
 *      password:
 *       type: string
 *       default: mypassword12345
 *    CreateSessionResponse:
 *     type: object
 *     required:
 *     - accessToken
 *     properties:
 *      accessToken:
 *       type: string
 */

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

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

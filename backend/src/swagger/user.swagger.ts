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

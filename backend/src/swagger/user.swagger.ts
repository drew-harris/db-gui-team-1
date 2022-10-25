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
 *       default: Tobin.Bayer
 *      email:
 *       type: string
 *       default: Verdie82@hotmail.com
 *      password:
 *       type: string
 *       default: guGfkoGoJ9NY0VW
 *      passwordConfirmation:
 *       type: string
 *       default: guGfkoGoJ9NY0VW

 *    CreateUserResponse:
 *     type: object
 *     properties:
 *      user:
 *       type: object
 *       properties:
 *        id:
 *         type: string
 *         default: cl9omjhxt0000jz4g46jnrqtb
 *        username:
 *         type: string
 *         default: Tobin.Bayer
 *        email:
 *         type: string
 *         default: Verdie82@hotmail.com
 *        createdAt:
 *         type: string
 *         default: 2022-10-25T19:52:16.529Z
 *      jwt:
 *       type: string
 *       default: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRvYmluLkJheWVyIiwiY3JlYXRlZEF0IjoiMjAyMi0xMC0yNVQxOTo1MjoxNi41MjlaIiwiZW1haWwiOiJWZXJkaWU4MkBob3RtYWlsLmNvbSIsImlkIjoiY2w5b21qaHh0MDAwMGp6NGc0NmpucnF0YiIsImlhdCI6MTY2NjcyNzUzN30.DAEWOqDTebx5KY2m-Ud6ICk11duypYyTWoMv-QUYqQs"
 *    GetAllUsersResponse:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        default: cl9omjhxt0000jz4g46jnrqtb
 *       username:
 *        type: string
 *        default: Tobin.Bayer
 *       email:
 *        type: string
 *        default: Verdie82@hotmail.com
 *       createdAt:
 *        type: string
 *        default: 2022-10-25T19:52:16.529Z
 */

/**
 * @openapi
 * /api/users/{id}:
 *  get:
 *   tags:
 *   - User
 *   summary: Get a user
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

/**
 * @openapi
 * /api/users:
 *  get:
 *   tags:
 *   - User
 *   summary: Get all users
 *   responses:
 *    200:
 *     description:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetAllUsersResponse'
 *    500:
 *     description: Could not fetch users
 *
 */

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

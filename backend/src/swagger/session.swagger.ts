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

 */

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
 *        $ref: '#/components/schemas/CreateUserResponse'
 *    400:
 *     description: Bad request
 *    401:
 *     description: Email or password not valid

 */

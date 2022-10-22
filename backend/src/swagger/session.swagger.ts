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
 *      jwt:
 *       type: string
 *       default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsOWhoZ3V3eDAwMDJqengxbzJjemRjM2EiLCJpYXQiOjE2NjYyOTU4OTN9.elZHRRcJtPVLmIQM7RJjSE_eAYMy5FafyDmIhfSedRo
 */

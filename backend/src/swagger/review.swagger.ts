/**
 * @openapi
 * components:
 *  schemas:
 *    CreateReviewInput:
 *     type: object
 *     required:
 *     - content
 *     - movieId
 *     - userId
 *     properties:
 *      content:
 *       type: string
 *       default: Unlike in his early work, he gives Moro the fullness of his vast and complicated formal consideration. Whenever Moro’s not on screen you miss him. Why should this be? We know little about him beyond his moral outlook, his way with his family, and his friends (who happen to include the pope [Toni Servillo]).
 *      movieId:
 *       type: string
 *       default: 19995
 *      userId:
 *       type: string
 *       default: cl9f830wh0000imwscdmy5nbl
 *    UpdateReviewInput:
 *     type: object
 *     required:
 *     - content
 *     properties:
 *      content:
 *       type: string
 *       default: Actually I don't like this movie.
 *    CreateReviewResponse:
 *     type: object
 *     required:
 *     - id
 *     - content
 *     - submittedAt
 *     - movieId
 *     - userId
 *     properties:
 *      id:
 *       type: string
 *       default: cl9hm3lz30000im04r3iwidps
 *      content:
 *       type: string
 *       default: Unlike in his early work, he gives Moro the fullness of his vast and complicated formal consideration. Whenever Moro’s not on screen you miss him. Why should this be? We know little about him beyond his moral outlook, his way with his family, and his friends (who happen to include the pope [Toni Servillo]).
 *      submittedAt:
 *       type: string
 *       default: 2022-10-20T22:05:32.032Z
 *      movieId:
 *       type: number
 *       default: 19995
 *      userId:
 *       type: string
 *       default: cl9f830wh0000imwscdmy5nbl
 *    GetAllReviewsResponse:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       id:
 *        type: string
 *        default: cl9hm3lz30000im04r3iwidps
 *       content:
 *        type: string
 *        default: Actually I don't like this movie.
 *       submittedAt:
 *        type: string
 *        default: 2022-10-20T22:05:32.032Z
 *       movieId:
 *        type: number
 *        default: 19995
 *       userId:
 *        type: string
 *        default: cl9f830wh0000imwscdmy5nbl
  *    EditReviewResponse:
 *     type: object
 *     required:
 *     - id
 *     - content
 *     - submittedAt
 *     - movieId
 *     - userId
 *     properties:
 *      id:
 *       type: string
 *       default: cl9hm3lz30000im04r3iwidps
 *      content:
 *       type: string
 *       default: Actually I don't like this movie.
 *      submittedAt:
 *       type: string
 *       default: 2022-10-20T22:05:32.032Z
 *      movieId:
 *       type: number
 *       default: 19995
 *      userId:
 *       type: string
 *       default: cl9f830wh0000imwscdmy5nbl

 */

/**
 * @openapi
 * /api/reviews:
 *  post:
 *   tags:
 *   - Review
 *   summary: Create review
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateReviewInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateReviewResponse'
 *    500:
 *     description: Could not create new review
 */

/**
 * @openapi
 * /api/reviews:
 *  put:
 *   tags:
 *   - Review
 *   summary: Edit review
 *   parameters:
 *    - in: query
 *      name: id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateReviewInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/EditReviewResponse'
 *    500:
 *     description: Could not create new review
 */


/**
 * @openapi
 * /api/reviews:
 *  get:
 *   tags:
 *   - Review
 *   summary: Get reviews
 *   parameters:
 *    - in: query
 *      name: id
 *    - in: query
 *      name: movieId
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetAllReviewsResponse'
 *    500:
 *     description: Could not fetch reviews
 */



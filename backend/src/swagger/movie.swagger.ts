/**
 * @openapi
 * components:
 *  schemas:
 *    CreateMovieInput:
 *     type: object
 *     required:
 *     - title
 *     properties:
 *      title:
 *       type: string
 *       default: Avatar
 *      posterImageUrl:
 *       type: string
 *       default: http://image.tmdb.org/t/p/w780/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg
 *      backdropImageUrl:
 *       type: string
 *       default: http://image.tmdb.org/t/p/w1280/Yc9q6QuWrMp9nuDm5R8ExNqbEq.jpg
 *      genre:
 *       type: string
 *       default: Action
 *      releaseDate:
 *       type: string
 *       default: 2009-12-15T00:00:00.000Z
 *      tagline:
 *       type: string
 *       default: Enter the world of Pandora.
 *      tmdbPopularity:
 *       type: string
 *       default: 648.095
 *      tmdbVoteCount:
 *       type: number
 *       default: 26319
 *      runTime:
 *       type: number
 *       default: 162
 *    CreateMovieResponse:
 *     type: object
 *     required:
 *     - title
 *     properties:
 *      id:
 *       type: number
 *       default: 1015731
 *      title:
 *       type: string
 *       default: Avatar
 *      posterImageUrl:
 *       type: string
 *       default: http://image.tmdb.org/t/p/w780/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg
 *      backdropImageUrl:
 *       type: string
 *       default: http://image.tmdb.org/t/p/w1280/Yc9q6QuWrMp9nuDm5R8ExNqbEq.jpg
 *      genre:
 *       type: string
 *       default: Action
 *      releaseDate:
 *       type: string
 *       default: 2009-12-15T00:00:00.000Z
 *      tagline:
 *       type: string
 *       default: Enter the world of Pandora.
 *      tmdbPopularity:
 *       type: string
 *       default: 648.095
 *      tmdbVoteCount:
 *       type: number
 *       default: 26319
 *      runTime:
 *       type: number
 *       default: 162
 *
 *    GetMoviesResponse:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       id:
 *        type: number
 *        default: 1015731
 *       title:
 *        type: string
 *        default: Avatar
 *       posterImageUrl:
 *        type: string
 *        default: http://image.tmdb.org/t/p/w780/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg
 *       backdropImageUrl:
 *        type: string
 *        default: http://image.tmdb.org/t/p/w1280/Yc9q6QuWrMp9nuDm5R8ExNqbEq.jpg
 *       genre:
 *        type: string
 *        default: Action
 *       releaseDate:
 *        type: string
 *        default: 2009-12-15T00:00:00.000Z
 *       tagline:
 *        type: string
 *        default: Enter the world of Pandora.
 *       tmdbPopularity:
 *        type: string
 *        default: 648.095
 *       tmdbVoteCount:
 *        type: number
 *        default: 26319
 *       runTime:
 *        type: number
 *        default: 162
 */

// first 50 movies

/**
 * @openapi
 * /api/movies:
 *  get:
 *   tags:
 *   - Movie
 *   summary: Get movies (filter/sort)
 *   parameters:
 *    - in: query
 *      name: title
 *    - in: query
 *      name: fromDate
 *    - in: query
 *      name: toDate
 *    - in: query
 *      name: tmdbLow
 *    - in: query
 *      name: tmdbHigh
 *    - in: query
 *      name: sortUp
 *    - in: query
 *      name: sortDown
 *    - in: query
 *      name: runTimeBegin
 *    - in: query
 *      name: runTimeEnd
 *    - in: query
 *      name: page
 *    - in: query
 *      name: genre
 *    - in: path
 *      name: movieID 

 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/GetMoviesResponse'
 *    500:
 *     description: Could not fetch movies
 */

/**
 * @openapi
 * /api/movies:
 *  post:
 *   tags:
 *   - Movie
 *   summary: Create movie
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/CreateMovieInput'
 *   responses:
 *    200:
 *     description: Success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateMovieResponse'
 *    500:
 *     description: Could not create new movie
 */

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
 *    GetAllMoviesResponse:
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

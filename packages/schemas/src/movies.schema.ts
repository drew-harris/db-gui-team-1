import z from "zod";

export const createMovieSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
});

export const getMoviesFilterSchema = z.object({
  genre: z
    .enum([
      "Animation",
      "Action",
      "Science Fiction",
      "Drama",
      "Family",
      "Horror",
      "Thriller",
      "Fantasy",
      "TV Movie",
      "Comedy",
      "Romance",
      "Crime",
      "Adventure",
    ])
    .optional(),
  fromDate: z.string({}).optional(),
  toDate: z.string({}).optional(),
  tmdbLow: z.string({}).optional(),
  tmdbHigh: z.string({}).optional(),
  sortUp: z
    .enum([
      "title",
      "genre",
      "releaseDate",
      "tmdbPopularity",
      "tmdbVoteCount",
      "runTime",
    ])
    .optional(),
  sortDown: z
    .enum([
      "title",
      "genre",
      "releaseDate",
      "tmdbPopularity",
      "tmdbVoteCount",
      "runTime",
    ])
    .optional(),
  runTimeBegin: z.string({}).optional(),
  runTimeEnd: z.string({}).optional(),
  page: z.string({}).optional(),
});

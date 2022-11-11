import { object, string } from "zod";

export const createRatingSchema = object({
  movieId: string({
    required_error: "Movie is required to post rating",
  }),
  score: string({
    required_error: "Score is required",
  }),
});

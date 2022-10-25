import { object, string } from "zod";

export const createReviewSchema = object({
  content: string({
    required_error: "Content is required",
  }),
  movieId: string({
    required_error: "movieId is required",
  }),
});

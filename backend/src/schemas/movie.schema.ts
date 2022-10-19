import { object, string } from "zod";

export const createMovieSchema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    }),
  }),
});

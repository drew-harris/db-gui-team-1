import z from "zod";

export const createMovieSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
  }),
});

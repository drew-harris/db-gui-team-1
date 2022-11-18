import { date } from "zod";
import prisma from "../utils/prisma.util";

export async function createMovie(body: Record<string, string>) {
  return prisma.movie.create({
    data: {
      title: body.title,
      genre: body.genre || null,
      description: body.description || null,
      posterImageUrl: body.posterImageUrl || null,
      releaseDate: body.releaseDate || null,
      backdropImageUrl: body.backdropImageUrl || null,
    },
  });
}

// export async function getMovieById(id: string) {
//   return await prisma.movie.findUnique({
//     where: {
//       id,
//     },
//   });
// }

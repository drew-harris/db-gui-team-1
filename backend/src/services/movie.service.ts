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

export function getMovies() {
  return prisma.movie.findMany({
    orderBy: {
      tmdbVoteCount: "desc",
    },
    take: 50,
  });
}

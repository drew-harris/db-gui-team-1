import prisma from '../utils/prisma'

export async function createMovie(data) {
  
    return prisma.movie.create({
        data: {
          title: data.title,
          genre: data.genre || null,
          description: data.description || null,
          posterImageUrl: data.posterImageUrl || null,
          releaseDate: data.releaseDate || null,
          backdropImageUrl: data.backdropImageUrl || null,
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
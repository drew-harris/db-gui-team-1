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

export function get100Movies() {
  return prisma.movie.findMany({
    orderBy: {
      tmdbVoteCount: "desc",
    },

    take: 50,
  });
}
export function filterMovies({
  page,
  sortUp,
  sortDown,
  genre,
  title,
  date: { from, to },
  tmdb: { low, high },
  runtime: { begin, end },
}) {
  if (isNaN(page)) page = 1;
  return prisma.movie.findMany({
    take: 50,
    skip: (page - 1) * 50,
    where: {
      ...(title && {
        title: {
          contains: title,
        },
      }),
      ...(genre && {
        genre: {
          contains: genre,
        },
      }),
      ...(from &&
        to && {
          releaseDate: {
            lte: to,
            gte: from,
          },
        }),
      ...(low &&
        high && {
          tmdbPopularity: {
            lte: high,
            gte: low,
          },
        }),
      ...(begin &&
        end && {
          runTime: {
            lte: end,
            gte: begin,
          },
        }),
    },
    orderBy: {
      ...(sortUp && {
        [sortUp]: "asc",
      }),
      ...(sortDown && {
        [sortDown]: "desc",
      }),
    },
  });
}

export async function getMovieById(id: number) {
  return await prisma.movie.findUnique({
    where: {
      id,
    },
  });
}

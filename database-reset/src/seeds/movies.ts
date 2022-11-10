import * as dotenv from "dotenv";
import { fetchWithKey } from "../api";
import { ApiMoive } from "../types";
import { prisma, PrismaClient } from "@prisma/client";

dotenv.config();
let movieIds: any[] = [];
const TOTAL_MOVIES = 400;

type Config = {
  base_url: string;
  secure_base_url: string;
  backdrop_sizes: string[];
  logo_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  still_sizes: string[];
};

async function getConfiguration(): Promise<Config> {
  const data = await fetchWithKey("/configuration");
  //console.log("CONFIG: ", data.images);
  return data.images as Config;
}

async function getIdsForPage(page: number): Promise<string[]> {
  const simpleMovies = await fetchWithKey("/movie/popular", { page: page });
  return simpleMovies.results.map((movie: any) => movie.id);
}

export async function movies(prisma: PrismaClient) {
  const configuration = await getConfiguration();
  // Exit if no environment variable

  let i = 1;
  while (movieIds.length < TOTAL_MOVIES) {
    const ids = await getIdsForPage(i);
    console.log(`Gotten ${movieIds.length} movies`);
    movieIds = [...movieIds, ...ids];
    i++;
  }

  movieIds.forEach(async (id, index) => {
    console.log(`adding movie ${index + 1} / ${TOTAL_MOVIES}`);

    const data = (await fetchWithKey("/movie/" + id)) as ApiMoive;
    if (!data.title || !data.id) {
      return;
    }

    const foundMovie = await prisma.movie.findFirst({
      where: {
        id: data.id,
      },
    });

    if (foundMovie) return;

    const createdMovie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.overview || null,
        genre: data.genres?.at(0)?.name || null,
        runTime: data.runtime || null,
        releaseDate: data.release_date ? new Date(data.release_date) : null,
        posterImageUrl: data.poster_path
          ? configuration.base_url +
            configuration.poster_sizes[configuration.poster_sizes.length - 2] +
            data.poster_path
          : null,
        backdropImageUrl: data.backdrop_path
          ? configuration.base_url +
            configuration.backdrop_sizes[
              configuration.backdrop_sizes.length - 2
            ] +
            data.backdrop_path
          : null,
        tagline: data.tagline || null,
        tmdbPopularity: data.popularity || null,
        tmdbVoteCount: data.vote_count || null,
      },
    });
  });
}

async function addReviewsForPage(
  // @ts-ignore
  userIds,
  prisma: PrismaClient,
  movieId: number
) {
  const reviews = await fetchWithKey("/movie/" + movieId + "/reviews", {
    page: 1,
  });
  const randomElement = userIds[Math.floor(Math.random() * userIds.length)];

  reviews.results.forEach(async (item: any, index: any) => {
    const foundMovie = await prisma.movie.findFirst({
      where: {
        id: movieId,
      },
    });

    if (!foundMovie) return;

    await prisma.review.create({
      data: {
        content: item.content,
        movieId,
        userId: randomElement.id,
      },
    });
    if (!item?.author_details?.rating) return;
    await prisma.rating.create({
      data: {
        score: (item.author_details.rating % 5) + 1,
        movieId,
        userId: randomElement.id,
      },
    });
  });
}
export async function reviews(prisma: PrismaClient) {
  const configuration = await getConfiguration();
  let i = 0;

  const userIds = await prisma.user.findMany({
    select: {
      id: true,
    },
  });

  while (i < TOTAL_MOVIES) {
    console.log(`adding reviews/ratings for movie ${i + 1}`);
    await addReviewsForPage(userIds, prisma, movieIds[i]);

    i++;
  }
}

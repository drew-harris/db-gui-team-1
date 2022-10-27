import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { fetchWithKey } from "./api";
import { ApiMoive } from "./types";

dotenv.config();

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
  console.log("CONFIG: ", data.images);
  return data.images as Config;
}

async function getIdsForPage(page: number): Promise<string[]> {
  const simpleMovies = await fetchWithKey("/movie/popular", { page: page });
  return simpleMovies.results.map((movie: any) => movie.id);
}

async function main() {
  const configuration = await getConfiguration();
  // Exit if no environment variable
  const prisma = new PrismaClient();
  // DELETE ALL MOVIES
  await prisma.review.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.movie.deleteMany({});
  const TOTAL_MOVIES = 400;
  let movieIds: any[] = [];
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

    try {
      const createdMovie = await prisma.movie.create({
        data: {
          title: data.title,
          description: data.overview || null,
          genre: data.genres?.at(0)?.name || null,
          runTime: data.runtime || null,
          releaseDate: data.release_date ? new Date(data.release_date) : null,
          posterImageUrl: data.poster_path
            ? configuration.base_url +
              configuration.poster_sizes[
                configuration.poster_sizes.length - 2
              ] +
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
    } catch (error) {
      console.error(error);
    }

    // Get movie info
  });
}

main();

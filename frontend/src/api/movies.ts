import { Movie } from "@prisma/client";
import { MovieWithCounts } from "../types";
import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export default async function getMovies({ filters }) {
  try {
    
    const response = await fetch(
      API_URL + "/api/movies?" + new URLSearchParams({ ...filters }),
      {
        headers: {
          jwt: getJwt(),
        },
      }
    );

    if (!response.ok) {
    
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data as MovieWithCounts[];
  } catch (error) {
    console.error(error);
    throw new Error("Error getting list of movies");
  }
}

export async function getMovieById(id) {
  try {
    const response = await fetch(API_URL + "/api/movies/" + id, {
      headers: {
        jwt: getJwt(),
      },
    });
    if (!response.ok) {
      
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data as Movie;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting list of movies");
  }
}

export async function searchMovies(title) {
  try {
    const url = API_URL + "/api/movies?" + new URLSearchParams({ title });
  
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        jwt: getJwt(),
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getMovieRanking(movieId: string) {
  try {
    const response = await fetch(API_URL + "/api/movies/ranking/" + movieId, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

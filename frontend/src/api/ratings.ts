import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAverageRating(movieId: string) {
  try {
    const response = await fetch(API_URL + "/api/ratings/average/" + movieId);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
    return (await response.json()) as { average: number; count: number };
  } catch (error) {
    throw new Error("Could not fetch reviews for movie");
  }
}

export async function getMyRatingForMovieId(movieId, userId) {
  try {
    const response = await fetch(
      API_URL + "/api/ratings/?" + new URLSearchParams({ movieId, userId }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
    const ratings = await response.json();
    if (ratings?.length && ratings.length > 0) {
      return ratings[0].score;
    }
    return null;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function rateMovie({ movieId, score }) {
  try {
    const response = await fetch(API_URL + "/api/ratings", {
      body: JSON.stringify({ movieId, score }),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        jwt: getJwt(),
      },
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error.message);
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

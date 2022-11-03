const API_URL = import.meta.env.VITE_API_URL;
import { Review, User } from "@prisma/client";
import { getJwt } from "../utils/jwt";

export async function getReviewsForMovie(movieId) {
  try {
    const response = await fetch(
      API_URL +
        "/api/reviews?" +
        new URLSearchParams({
          movieId,
        })
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    return (await response.json()) as (Review & {
      by: User;
    })[];
  } catch (error) {
    throw new Error("Could not fetch reviews for movie");
  }
}

import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export default async function getMovies({ page }) {
  try {
    const response = await fetch(
      API_URL + "/api/movies?" + new URLSearchParams({ page: page }),
      {
        headers: {
          jwt: getJwt(),
        },
      }
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting list of movies");
  }
}

export async function getMovieById(id) {
  try {
    const response = await fetch(API_URL + "/api/movies/" + id);
    if (!response.ok) {
      console.log(response);
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting list of movies");
  }
}

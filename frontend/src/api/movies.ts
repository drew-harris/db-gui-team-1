import { type Movie } from "@prisma/client";

const API_URL = import.meta.env.VITE_API_URL;

export default async function getAllMovies() {
  try {
    const response = await fetch(API_URL + "/allmovies");
    if (!response.ok) {
      console.log(response);
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data as Movie;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting information");
  }
}

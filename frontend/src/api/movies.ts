const API_URL = import.meta.env.VITE_API_URL;

export default async function getAllMovies() {
  try {
    const response = await fetch(API_URL + "/api/movies");
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

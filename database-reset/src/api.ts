import fetch from "cross-fetch";
import * as dotenv from "dotenv";
dotenv.config();

const API_URL = "https://api.themoviedb.org/3";
const API_KEY: string = process.env.MOVIE_API_KEY as string;

async function fetchWithKey(path: string, params?: object | undefined) {
  const url =
    API_URL +
    path +
    "?" +
    new URLSearchParams({
      api_key: API_KEY,
      ...params,
    });
  console.log(url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Could not fetch path: " + path);
  }

  const data = await response.json();

  return data;
}
export { fetchWithKey };

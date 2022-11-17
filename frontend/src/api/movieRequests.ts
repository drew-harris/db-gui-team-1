import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMyMovieRequests() {
  try {
    const response = await fetch(API_URL + "/api/movierequests", {
      headers: {
        "Content-Type": "application/json",
        jwt: getJwt(),
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

export async function createNewMovieRequest({ title, message }) {
  try {
    const response = await fetch(API_URL + "/api/movierequests/", {
      body: JSON.stringify({ title, message }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        jwt: getJwt(),
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

import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export async function getUserInfo(userId?: string) {
  try {
    const response = await fetch(
      API_URL +
        "/api/users/about?" +
        new URLSearchParams({
          id: userId,
        }),
      {
        headers: {
          "Content-Type": "application/json",
          jwt: getJwt(),
        },
      }
    );
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Could not fetch user info");
  }
}

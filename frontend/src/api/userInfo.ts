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

    return data;
  } catch (error) {
    throw new Error("Could not fetch user info");
  }
}

export async function saveProfileInformation({ bio, profileImageUrl }) {
  try {
    const response = await fetch(API_URL + "/api/users/", {
      method: "PUT",
      body: JSON.stringify({ bio, profileImageUrl }),
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

export async function searchUsers(search) {
  try {
    const response = await fetch(
      API_URL + "/api/users?" + new URLSearchParams({ search }),
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
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

import { getJwt } from "../utils/jwt";

const API_URL = import.meta.env.VITE_API_URL;

export async function getMyListsForMovie({ movieId, userId }) {
  try {
    const response = await fetch(
      API_URL + "endpoint" + new URLSearchParams({ userId, movieId }),
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
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getListsByUserId(userId) {
  try {
    const response = await fetch(
      API_URL + "/api/list?" + new URLSearchParams({ userId }),
      {
        headers: {
          "Content-Type": "application/json",
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
    throw new Error(error.message);
  }
}

export async function createNewList(name) {
  try {
    const response = await fetch(API_URL + "/api/list", {
      body: JSON.stringify({ name }),
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

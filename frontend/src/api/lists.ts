const API_URL = import.meta.env.VITE_API_URL;

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

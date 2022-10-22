const API_URL = import.meta.env.VITE_API_URL;

export async function logIn({ email, password }) {
  try {
    const response = await fetch(API_URL + "/api/sessions", {
      body: JSON.stringify({ email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

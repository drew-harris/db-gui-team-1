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
      console.log(data);
      throw new Error(data?.error?.message || "Something went wrong");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signUp(body) {
  try {
    const response = await fetch(API_URL + "/api/users", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error(data.error.message);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "Something went wrong");
  }
}

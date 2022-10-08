const API_URL = import.meta.env.VITE_API_URL;

export default async function getWhaleInfo() {
  try {
    const response = await fetch(API_URL + "/bluewhale");
    if (!response.ok) {
      console.log(response);
      throw new Error("Error getting information");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting information");
  }
}

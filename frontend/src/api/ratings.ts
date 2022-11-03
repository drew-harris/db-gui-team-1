const API_URL = import.meta.env.VITE_API_URL;

export async function getAverageRating(movieId: string) {
  try {
    const response = await fetch(API_URL + "/api/ratings/average/" + movieId);

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    return (await response.json()) as { average: number };
  } catch (error) {
    throw new Error("Could not fetch reviews for movie");
  }
}

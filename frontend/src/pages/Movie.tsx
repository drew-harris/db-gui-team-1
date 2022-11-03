import { Movie } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import { getMovieById } from "../api/movies";
import { getReviewsForMovie } from "../api/reviews";

export const MoviePage = () => {
  const initialMovies = useLoaderData() as Movie;
  const { id } = useParams();
  const {
    data: movie,
    status,
    error,
  } = useQuery(["movie", { id: initialMovies.id }], () => getMovieById(id), {
    initialData: initialMovies,
  });

  const { data: reviews } = useQuery(["reviews", { movieId: id }], () =>
    getReviewsForMovie(id)
  );

  if (!movie) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-[auto_1fr] gap-4">
        {JSON.stringify(reviews, null, 4)}
        <div>
          <div className="font-bold mt-4 text-3xl">{movie.title}</div>
          <div className="italic">{movie.tagline}</div>
          <div className="flex gap-4">
            <div>{movie.genre}</div>
            <div>{movie.runTime} min.</div>
            <div>{new Date(movie.releaseDate).toLocaleDateString()}</div>
          </div>
          <div className="mt-4">{movie.description}</div>
        </div>
      </div>
    </div>
  );
};

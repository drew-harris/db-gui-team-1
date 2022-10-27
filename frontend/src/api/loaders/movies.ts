import { getMovieById } from "../movies";

export default function singleMovieLoader({ params }) {
  const id = params.id;
  return getMovieById(id);
}

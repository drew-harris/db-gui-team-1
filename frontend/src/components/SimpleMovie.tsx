import { Movie } from "@prisma/client";

export default function SimpleMovie({ movie }: { movie: Movie }) {
  console.log(movie);
  return (
    <div className="p-2 text-center flex flex-col items-center gap-2 border-white border rounded">
      <div>{movie.title}</div>
      <img className="w-24" src={movie.posterImageUrl}></img>
      <div>{movie.genre}</div>
      <div>{movie.tagline}</div>
    </div>
  );
}

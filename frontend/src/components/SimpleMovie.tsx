import { Movie } from "@prisma/client";
import { Link } from "react-router-dom";

export default function SimpleMovie({ movie }: { movie: Movie }) {
  return (
    <Link to={"/movie/" + movie.id}>
      <div className="border border-orange-200">
        <img className="w-32" src={movie.posterImageUrl}></img>
      </div>
    </Link>
  );
}

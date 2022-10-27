import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import getMovies from "../api/movies";
import SimpleMovie from "../components/SimpleMovie";
import "../index.css";

function Home() {
  const [page, setPage] = useState(8);
  const {
    data: movies,
    status,
    error,
  } = useQuery(["movies"], () => getMovies({ page: page }), {
    retry: false,
  });

  return (
    <div className=" text-white px-5">
      <div className="text-3xl mb-2 font-bold">Top Movies</div>
      {error && error instanceof Error && (
        <div>{error.message || "Error getting movies"} TEST</div>
      )}
      <div className="flex flex-wrap gap-4 justify-around">
        {movies &&
          movies.map((movie) => {
            return <SimpleMovie movie={movie} key={movie.id} />;
          })}
      </div>
    </div>
  );
}

export default Home;

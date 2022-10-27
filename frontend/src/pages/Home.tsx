import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getMovies from "../api/movies";
import SimpleMovie from "../components/SimpleMovie";
import "../index.css";

function Home() {
  const [page, setPage] = useState(1);
  const client = useQueryClient();
  const {
    data: movies,
    status,
    error,
  } = useQuery(["movies", { page: page }], () => getMovies({ page: page }), {
    retry: false,
  });

  useEffect(() => {
    client.prefetchQuery(["movies", { page: page + 1 }], () =>
      getMovies({ page: page + 1 })
    );
  }, [page]);

  return (
    <div className=" text-white px-5">
      <div className="text-3xl mb-2 font-bold">Top Movies</div>
      {error && error instanceof Error && (
        <div>{error.message || "Error getting movies"} TEST</div>
      )}
      <button onClick={() => setPage((curr) => curr + 1)}>Next page</button>
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

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import getAllMovies from "./api/movies";
import SimpleMovie from "./components/SimpleMovie";
import { AuthContext } from "./context/AuthContext";
import "./index.css";

function App() {
  const {
    data: movies,
    status,
    error,
  } = useQuery(["movies"], getAllMovies, {
    retry: false,
  });

  const { user } = useContext(AuthContext);

  return (
    <div className=" text-white p-3">
      <div className="text-orange-500 font-bold text-2xl mb-4">
        Blank React App
      </div>
      <div>Current User: {JSON.stringify(user, null, 4)}</div>
      {status === "loading" && <div>Loading...</div>}
      {error && error instanceof Error && (
        <div>{error.message || "Error getting movies"} TEST</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {movies &&
          movies.map((movie) => {
            return <SimpleMovie movie={movie} key={movie.id} />;
          })}
      </div>
    </div>
  );
}

export default App;

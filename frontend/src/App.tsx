import { useEffect, useState } from "react";
import getAllMovies from "./api/movies";
import SimpleMovie from "./components/SimpleMovie";
import "./index.css";

function App() {
  const [movies, setMovieData] = useState(null);

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMovies();
      console.log(data);
      setMovieData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-900 text-white p-3">
      <div className="text-orange-500 font-bold text-2xl">Blank React App</div>
      <div>Movies from DATABASE:</div>
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

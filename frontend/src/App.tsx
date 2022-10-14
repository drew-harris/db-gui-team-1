import { useEffect, useState } from "react";
import getAllMovies from "./api/movies";
import "./App.css";

function App() {
  const [movies, setMovieData] = useState(null);

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllMovies();
      setMovieData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="middle">
      <div className="title">Blank React App</div>
      <div>Movies from DATABASE:</div>
      <pre>{movies ? JSON.stringify(movies, null, 4) : "Loading..."}</pre>
    </div>
  );
}

export default App;

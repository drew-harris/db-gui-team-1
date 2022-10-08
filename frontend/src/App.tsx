import { useEffect, useState } from "react";
import getWhaleInfo from "./api/whale";
import "./App.css";

function App() {
  const [whaleData, setWhaleData] = useState(null);

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const data = await getWhaleInfo();
      setWhaleData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="middle">
      <div className="title">Blank React App</div>
      <div id="whale-data-header">Whale Data From API:</div>
      <pre>{whaleData ? JSON.stringify(whaleData, null, 4) : "Loading..."}</pre>
    </div>
  );
}

export default App;

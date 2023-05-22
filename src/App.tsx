import "./App.css";
import Map from "./components/Map";


function App() {
  const options = {
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    mapStyle: "mapbox://styles/mapbox/light-v10",
    longitude: -96,
    latitude: 37.8,
    zoom: 3,
  };

  return (
    <div className="App">
      <Map options={options} />
    </div>
  );
}

export default App;

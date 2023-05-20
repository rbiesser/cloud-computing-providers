import "./App.css";
import Map from "./components/Map";

function App() {
  const options: Partial<mapboxgl.MapboxOptions> = {
    style: "mapbox://styles/mapbox/light-v10",
    center: [-96, 37.8],
    zoom: 3,
  };

  return (
    <div className="App">
      <Map options={options} />
    </div>
  );
}

export default App;

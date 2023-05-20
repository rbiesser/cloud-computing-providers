import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || ""

function App() {

const mapContainer = useRef<HTMLDivElement>(null);
const map = useRef<mapboxgl.Map>();
// TODO: can this be a single object?
// eslint-disable-next-line
const [lng, setLng] = useState(-96);
// eslint-disable-next-line
const [lat, setLat] = useState(37.8);
// eslint-disable-next-line
const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer?.current?mapContainer.current:"",
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom
    });
  });
  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;

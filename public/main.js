// https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHM1ZXhwemFiaTZ2Y290dmJsOGQiLCJhIjoiY2s1dnF6YXdiMTBudjNtbWM5cnNhb2I1NCJ9.pyXawY1GuU3ixXc6ys23OQ";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-96, 37.8],
  zoom: 3,
});

map.on("load", function () {
  map.loadImage("/img/logo_azure.png", (error, image) => {
    if (error) throw error;
    map.addImage("azure", image);
    map.addLayer({
      id: "azure",
      source: {
        type: "geojson",
        data: "/api/regions/azure", // request from GeoJson route on the localhost
      },
      type: "symbol",
      paint: {
        // Mapbox Style Specification paint properties
      },
      layout: {
        "icon-image": "azure",
        "icon-size": 0.5,
        // Mapbox Style Specification layout properties
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
        "text-justify": "auto",
        "text-field": ["get", "region"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.8],
        "text-anchor": "top",
      },
    });
  });

  map.loadImage("/img/Amazon_Web_Services_Logo.png", (error, image) => {
    if (error) throw error;
    map.addImage("aws", image);
    map.addLayer({
      id: "aws",
      source: {
        type: "geojson",
        data: "/api/regions/aws", // request from GeoJson route on the localhost
      },
      type: "symbol",
      paint: {
        // Mapbox Style Specification paint properties
      },
      layout: {
        "icon-image": "aws",
        "icon-size": 0.14,
        // Mapbox Style Specification layout properties
        "text-field": ["get", "region"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.8],
        "text-anchor": "top",
      },
    });
  });

  map.loadImage("/img/google-cloud-seeklogo.com.png", (error, image) => {
    if (error) throw error;
    map.addImage("gcp", image);
    map.addLayer({
      id: "gcp",
      source: {
        type: "geojson",
        data: "/api/regions/gcp", // request from GeoJson route on the localhost
      },
      type: "symbol",
      paint: {
        // Mapbox Style Specification paint properties
      },
      layout: {
        "icon-image": "gcp",
        "icon-size": 0.13,
        // Mapbox Style Specification layout properties
        "text-field": ["get", "region"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.8],
        "text-anchor": "top",
      },
    });
  });

  map.addControl(
    new mapboxgl.FullscreenControl({
      container: document.querySelector("body"),
    })
  );

  // https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
  var toggleableLayerIds = ["azure", "aws", "gcp"];

  for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement("a");
    link.href = "#";
    link.className = "active";
    link.textContent = id;

    link.onclick = function (e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, "visibility");

      console.log(visibility);

      if (visibility === "visible" || visibility === undefined) {
        map.setLayoutProperty(clickedLayer, "visibility", "none");
        this.className = "";
      } else {
        this.className = "active";
        map.setLayoutProperty(clickedLayer, "visibility", "visible");
      }
    };

    var layers = document.getElementById("menu");
    layers.appendChild(link);
  }
}); // end on load function

// const weatherDisplay = document.querySelector('.weather')
// const weatherForm = document.querySelector('#weather-form')
// const cityInput = document.querySelector('#city-input')

// // Fetch weather data from API
// const fetchWeather = async (city) => {
//   const url = `/api?q=${city}`

//   const res = await fetch(url)
//   const data = await res.json()

//   if (data.cod === '404') {
//     alert('City not found')
//     return
//   }

//   if (data.cod === 401) {
//     alert('Invalid API Key')
//     return
//   }

//   const displayData = {
//     city: data.name,
//     temp: kelvinToFahrenheit(data.main.temp),
//   }

//   addWeatherToDOM(displayData)
// }

// // Add display data to DOM
// const addWeatherToDOM = (data) => {
//   weatherDisplay.innerHTML = `
//     <h1>Weather in ${data.city}</h1>
//     <h2>${data.temp} &deg;F</h2>
//   `
//   cityInput.value = ''
// }

// // Convert Kelvin to Fahrenheit
// const kelvinToFahrenheit = (temp) => {
//   return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
// }

// // Event listener for form submission
// weatherForm.addEventListener('submit', (e) => {
//   e.preventDefault()

//   if (cityInput.value === '') {
//     alert('Please enter a city')
//   } else {
//     fetchWeather(cityInput.value)
//   }
// })

// // Initial fetch
// fetchWeather('Miami')

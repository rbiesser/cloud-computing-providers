// https://docs.mapbox.com/help/troubleshooting/how-to-use-mapbox-securely/
mapboxgl.accessToken =
  "pk.eyJ1IjoiZHM1ZXhwemFiaTZ2Y290dmJsOGQiLCJhIjoiY2s1dnF6YXdiMTBudjNtbWM5cnNhb2I1NCJ9.pyXawY1GuU3ixXc6ys23OQ";

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v10",
  center: [-96, 37.8],
  zoom: 3,
});

// each icon has a different size
// alternatively use icons with the same size
const markers = [
  {
    name: "azure",
    url: "/img/logo_azure.png",
    iconSize: 0.5,
  },
  {
    name: "aws",
    url: "/img/Amazon_Web_Services_Logo.png",
    iconSize: 0.14,
  },
  {
    name: "gcp",
    url: "/img/google-cloud-seeklogo.com.png",
    iconSize: 0.13,
  },
];

// https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
var toggleableLayerIds = [];

map.on("load", () => {
  markers.forEach((marker) => {
    toggleableLayerIds.push(marker.name);
    map.loadImage(marker.url, (error, image) => {
      if (error) throw error;
      map.addImage(marker.name, image);
      map.addLayer({
        id: marker.name,
        source: {
          type: "geojson",
          data: `/api/regions/${marker.name}`, // request from route
        },
        type: "symbol",
        paint: {
          // Mapbox Style Specification paint properties
        },
        layout: {
          "icon-image": marker.name,
          "icon-size": marker.iconSize,
          // Mapbox Style Specification layout properties
          // "text-field": ["get", "name"],
          // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          // "text-offset": [0, 0.8],
          // "text-anchor": "top",
        },
      });
    });
    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", marker.name, (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const displayName = e.features[0].properties.displayName;

      const description = `<strong>${displayName}</strong>`;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", marker.name, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", marker.name, () => {
      map.getCanvas().style.cursor = "";
    });
  });

  map.addControl(
    new mapboxgl.FullscreenControl({
      container: document.querySelector("body"),
    })
  );

  toggleableLayerIds.forEach((id) => {
    var link = document.createElement("a");
    link.href = "#";
    link.className = "active";
    link.textContent = id;

    link.onclick = function (e) {
      var clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      var visibility = map.getLayoutProperty(clickedLayer, "visibility");

      console.log(clickedLayer, visibility);

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
  });
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

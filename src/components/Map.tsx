import { useRef, useEffect } from "react";
import "./Map.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

interface Props {
  options: Partial<mapboxgl.MapboxOptions>;
}

function Map({ options }: Props) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map>();
  useEffect(() => {
    if (!mapboxgl.accessToken) {
      console.warn(
        "An API access token is required to use Mapbox GL. See https://docs.mapbox.com/api/overview/#access-tokens-and-token-scopes"
      );
      return;
    }

    if (mapRef.current) return; // initialize map only once

    // map.current = new mapboxgl.Map({
    //   container: mapContainerRef?.current ? mapContainerRef.current : "",
    //   ...options,
    // })

    const map = new mapboxgl.Map({
      container: mapContainerRef?.current ? mapContainerRef.current : "",
      ...options,
    });

    // each icon has a different size
    // alternatively use icons with the same size
    // const markers = [
    //   {
    //     name: "azure",
    //     url: "/img/logo_azure.png",
    //     iconSize: 0.5,
    //   },
    //   {
    //     name: "aws",
    //     url: "/img/Amazon_Web_Services_Logo.png",
    //     iconSize: 0.14,
    //   },
    //   {
    //     name: "gcp",
    //     url: "/img/google-cloud-seeklogo.com.png",
    //     iconSize: 0.13,
    //   },
    // ];

    // https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/
    // var toggleableLayerIds: Array<any> = [];

    // map.on("load", () => {
    //   markers.forEach((marker) => {
    //     toggleableLayerIds.push(marker.name);
    //     map.loadImage(marker.url, (error, image) => {
    //       if (error) throw error;
    //       if (!image) return;
    //       map.addImage(marker.name, image);
    //       map.addLayer({
    //         id: marker.name,
    //         source: {
    //           type: "geojson",
    //           data: `/api/regions/${marker.name}`, // request from route
    //         },
    //         type: "symbol",
    //         paint: {
    //           // Mapbox Style Specification paint properties
    //         },
    //         layout: {
    //           "icon-image": marker.name,
    //           "icon-size": marker.iconSize,
    //           // Mapbox Style Specification layout properties
    //           // "text-field": ["get", "name"],
    //           // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    //           // "text-offset": [0, 0.8],
    //           // "text-anchor": "top",
    //         },
    //       });
    //     });
    //     // When a click event occurs on a feature in the places layer, open a popup at the
    //     // location of the feature, with description HTML from its properties.
    //     // map.on("click", marker.name, (e) => {
    //     //   // Copy coordinates array.
    //     //   const coordinates = e.features?[0].geometry.coordinates.slice();
    //     //   const displayName = e.features?[0].properties.displayName;

    //     //   const description = `<strong>${displayName}</strong>`;

    //     //   // Ensure that if the map is zoomed out such that multiple
    //     //   // copies of the feature are visible, the popup appears
    //     //   // over the copy being pointed to.
    //     //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //     //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     //   }

    //     //   new mapboxgl.Popup()
    //     //     .setLngLat(coordinates)
    //     //     .setHTML(description)
    //     //     .addTo(map);
    //     // });

    //     // Change the cursor to a pointer when the mouse is over the places layer.
    //     map.on("mouseenter", marker.name, () => {
    //       map.getCanvas().style.cursor = "pointer";
    //     });

    //     // Change it back to a pointer when it leaves.
    //     map.on("mouseleave", marker.name, () => {
    //       map.getCanvas().style.cursor = "";
    //     });
    //   });

    //   map.addControl(
    //     new mapboxgl.FullscreenControl({
    //       container: document.querySelector("body"),
    //     })
    //   );

    //   // toggleableLayerIds.forEach((id) => {
    //   //   var link = document.createElement("a");
    //   //   link.href = "#";
    //   //   link.className = "active";
    //   //   link.textContent = id;

    //   //   link.onclick = function (e) {
    //   //     var clickedLayer = this.textContent;
    //   //     e.preventDefault();
    //   //     e.stopPropagation();

    //   //     var visibility = map.getLayoutProperty(clickedLayer, "visibility");

    //   //     console.log(clickedLayer, visibility);

    //   //     if (visibility === "visible" || visibility === undefined) {
    //   //       map.setLayoutProperty(clickedLayer, "visibility", "none");
    //   //       this.className = "";
    //   //     } else {
    //   //       this.className = "active";
    //   //       map.setLayoutProperty(clickedLayer, "visibility", "visible");
    //   //     }
    //   //   };

    //   //   var layers = document.getElementById("menu");
    //   //   layers.appendChild(link);
    //   // });
    // }); // end on load function

    mapRef.current = map;

    // Clean up on unmount
    // return () => map.remove();
  }, [options]);

  return <div className="map-container" ref={mapContainerRef} />;
}

export default Map;

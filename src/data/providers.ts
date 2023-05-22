
// each icon has a different size

import { FeatureCollection } from "geojson";

// alternatively use icons with the same size
export const providers = [
  {
    name: "azure",
    url: "/img/azure_avatar.png",
    iconSize: 0.5,
  },
  {
    name: "aws",
    url: "/img/amazon-web-services_avatar.png",
    iconSize: 0.14,
  },
  {
    name: "gcp",
    url: "/img/google-cloud-platform_avatar.png",
    iconSize: 0.13,
  },
];

export const featureCollection: FeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        provider: "azure",
        show: true
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.53063297271729,
          39.18174077994108
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "azure"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.55409332519379, 39.18091914650475
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "azure"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.559636913968, 39.19374620323012
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "gcp"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.57595569992094, 39.16428539705723
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "gcp"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.5139485719254, 39.13965653753095
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "gcp"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.62788036807943, 39.163894530105125
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        provider: "gcp"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -76.57559293278625, 39.16391973187595
        ]
      }
    },
  ]
}

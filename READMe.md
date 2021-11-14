# Cloud Computing Providers

Plot Cloud computing providers on the map using MapBox.

Rewritten using express from https://github.com/rbiesser/cloud-providers-azure-razor-pages

## Usage

### Install dependencies

```bash
npm install
```

### Run on http://localhost:5000

```bash
npm run dev
```

### Add public API info

Rename **.env.example** to **.env** and edit the values

If the public API URL is **https://api.openweathermap.org/data/2.5/weather?q={city}&appid={APIkey}**

- API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
- API_KEY_NAME = "appid"
- API_KEY_VALUE = "YOUR API KEY"

You can add on any other query params as needed when hitting the /api endpoint such as https://yourdomain/api?q=detroit without having to add your key in the client

- Add new routes as you see fit
- Change rate limiting and caching to desired values

This project is forked from this [YouTube tutorial](https://youtu.be/ZGymN8aFsv4)

---

## Mapbox GL JS
- [Mapbox GL JS API Reference](https://docs.mapbox.com/mapbox-gl-js/api/)
- [How Mapbox works, web applications](https://docs.mapbox.com/help/how-mapbox-works/web-apps/)
- Their documentation doesn't describe the functions very well, so use the Help page for descriptions and then the API Reference for details.

## GeoJSON.js
GeoJSON.js converts latitude and longitude to GeoJSON. https://www.npmjs.com/package/geojson

## Cloud Providers
### Microsoft Azure
- [Azure Regions](https://azure.microsoft.com/en-us/global-infrastructure/regions/)
- [Azure Documentation](https://docs.microsoft.com/en-us/azure/)

### Amazon AWS
- [AWS Global Infrastructure](https://aws.amazon.com/about-aws/global-infrastructure/)
- [AWS Documentation](https://docs.aws.amazon.com/)

### Google Cloud Platform
- [GCP Global Infrastructure](https://cloud.withgoogle.com/infrastructure)
- [GCP Documentation](https://cloud.google.com/docs)
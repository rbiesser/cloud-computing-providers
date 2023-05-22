import React, { useState } from 'react';
import MapGL, { Layer, Source, Image, Filter } from '@urbica/react-map-gl';
import "./Map.css";
import { useEffect } from 'react';
import { featureCollection, providers } from '../data/providers';

interface MapboxOptions {
  accessToken: string
  // TODO: import { StyleSpecification } from "mapbox-gl/src/style-spec/types";
  // is not in a typescript definition
  mapStyle: string
  longitude: number
  latitude: number
  zoom: number
}

interface Props {
  options: MapboxOptions
}

const Map: React.FunctionComponent<Props> = ({ options }) => {


  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11
  });

  const [position, setPosition] = useState({
    longitude: 0,
    latitude: 0
  });

  useEffect(() => {
    console.log(viewport, position)
  }, [viewport, position])

  const enum styles {
    light = 'mapbox://styles/mapbox/light-v10',
    dark = 'mapbox://styles/mapbox/dark-v10'
  };
  const [styleId, setStyleId] = useState<styles>(styles.light);

  const onMapClick = (event: any) => {
    console.log(event)
    setPosition({ longitude: event.lngLat.lng, latitude: event.lngLat.lat });
    const position = `${event.lngLat.lng}, ${event.lngLat.lat}`
    console.log(position)
    navigator.clipboard.writeText(position)
  };

  const onZoomEnd = (event: any) => {
    console.log(event.target.getZoom())
  }

  const loadImages = () => {
    return (
      <>

        <Image id='azure-image' image={providers[0].url} />
        <Image id='gcp-image' image={providers[2].url} />
      </>
    )
  }

  useEffect(() => { console.log('render') }, [])
  return (
    <>
      <MapGL
        mapStyle={styleId}
        accessToken={options.accessToken}
        latitude={options.latitude}
        longitude={options.longitude}
        zoom={options.zoom}
        onClick={onMapClick}
        onViewportChange={setViewport}
        onZoomend={onZoomEnd}
      >
        {loadImages()}

        {/* add a source, create a layer containing the source by id */}
        <Source
          id='providers'
          type='geojson'
          data={featureCollection}
          cluster={true}
          clusterMaxZoom={0} // Max zoom to cluster points on
          clusterRadius={50} // Radius of each cluster when clustering points (defaults to 50) 
        // clusterMinPoints
        // clusterProperties

        />
        <Layer
          id='azure-layer'
          type='symbol'
          source='providers'
          filter={['==', 'provider', 'azure']}
          layout={{
            'icon-image': 'azure-image',
            'icon-size': .25
          }}
        />
        <Layer
          id='gcp-layer'
          type='symbol'
          source='providers'
          filter={['==', 'provider', 'gcp']}
          layout={{
            'icon-image': 'gcp-image',
            'icon-size': .25
          }}
        />
        <Layer
          id='clusters'
          type='circle'
          source='providers'
          filter={['has', 'point_count']}

        />

        <Filter layerId='points' filter={['==', 'show', true]} />

      </MapGL>

      <div className='style-selector'>
        <button onClick={() => setStyleId(styles.light)}>light</button>
        <button onClick={() => setStyleId(styles.dark)}>dark</button>

      </div>
    </>
  )
}
export default Map
import React, { useMemo } from 'react';
import Map from 'react-map-gl';
import { useAppSelector } from '../../app/hooks';
import { selectLegs } from '../routes/routesSlice';
import DrawLegs from './DrawLegs';
import './mapStyle.css';
import style from './style.json';

const accessToken = process.env.REACT_APP_MAPBOX_PUBLIC_TOKEN;

function MapContainer() {
  const legs = useAppSelector(selectLegs);

  const layers = useMemo(() => <DrawLegs legs={legs} />, [legs]);

  return (
    <Map
      initialViewState={{
        latitude: 60.172059,
        longitude: 24.905831,
        zoom: 11,
      }}
      reuseMaps
      style={{ width: 'auto', height: '100%' }}
      mapboxAccessToken={accessToken}
      mapStyle={style as import('mapbox-gl').Style}
      id="main-map"
    >
      {layers}
    </Map>
  );
}

export default MapContainer;

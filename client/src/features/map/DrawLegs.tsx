import pld from '@mapbox/polyline';
import bbox from '@turf/bbox';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line object-curly-newline
import { Layer, Source, useMap, Marker, MarkerProps } from 'react-map-gl';
import { Leg, Maybe, Stop } from '../../graphql/graphql';
import { layerStyle, modeToColor } from './mapHelper';

type DrawLegsProps = {
  legs: Maybe<Leg>[] | null;
};

type MarkerPropsWithURL = MarkerProps & { url: string };

export default function DrawLegs({ legs }: DrawLegsProps) {
  const { current: map } = useMap();

  const initData: GeoJSON.FeatureCollection<GeoJSON.Geometry> = {
    type: 'FeatureCollection',
    features: [],
  };

  const [data, setData] =
    useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(initData);

  const [markerprops, setMarkerprops] = useState<MarkerPropsWithURL[]>();

  const imgUrls: Record<string, string> = {
    TRAM: 'https://raw.githubusercontent.com/HSLdevcom/hsl-map-style/master/map-icons/icon-stop-tram.svg',
    SUBWAY:
      'https://raw.githubusercontent.com/HSLdevcom/hsl-map-style/master/map-icons/icon-entrance-subway.svg',
    BUS: 'https://raw.githubusercontent.com/HSLdevcom/hsl-map-style/master/map-icons/icon-stop-bus.svg',
    DEFAULT:
      'https://icons-for-free.com/download-icon-map+marker+icon-1320166582858325800_512.png',
  };

  const createMarkerProps = (stop: Stop): MarkerPropsWithURL => ({
    longitude: stop.lon!,
    latitude: stop.lat!,
    url: imgUrls[stop.vehicleMode!] || imgUrls.DEFAULT,
  });

  useEffect(() => {
    if (legs) {
      // add route lines to source layer
      const fs: Feature<Geometry, GeoJsonProperties>[] = legs?.map((l) => ({
        type: 'Feature',
        properties: {
          color: modeToColor(l?.mode as string),
        },
        geometry: pld.toGeoJSON(l?.legGeometry?.points),
      }));
      setData({
        type: 'FeatureCollection',
        features: fs,
      });
      // add markers
      const stops = legs
        ?.map((l) => l?.from.stop)
        .concat(legs[legs.length - 1]?.to.stop);
      // add origin location to the list
      if (stops) {
        const props = stops.filter((n) => n).map((s) => createMarkerProps(s!));
        setMarkerprops(props);
      }
    } else {
      // reset if null
      setData(initData);
      setMarkerprops([]);
    }
  }, [legs]);

  useEffect(() => {
    if (data.features.length > 0 && map) {
      const [minLon, minLat, maxLon, maxLat] = bbox(data);
      map.fitBounds([minLon, minLat, maxLon, maxLat], { padding: 20 });
    }
  }, [data]);

  return (
    <>
      <Source type="geojson" data={data} id="overlay-data">
        <Layer {...layerStyle} id="overlay-layer" />
      </Source>
      {markerprops &&
        markerprops.map((p) => (
          <Marker
            longitude={p.longitude}
            latitude={p.latitude}
            anchor="bottom"
            key={p.longitude + p.latitude}
          >
            <img
              src={p.url}
              alt="marker_icon"
              data-testid={p.url}
              style={{
                width: 15,
                height: 'auto',
                transform: 'translateY(5px)',
              }}
            />
          </Marker>
        ))}
    </>
  );
}

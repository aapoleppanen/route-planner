import React, { useEffect } from 'react';
import { useMap } from 'react-map-gl';
import bbox from '@turf/bbox';

type BoundsControlProps = {
  featureCol: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
};

export default function BoundsControl({ featureCol }: BoundsControlProps) {
  const { current: map } = useMap();

  useEffect(() => {
    if (featureCol.features.length > 0 && map) {
      const [minLon, minLat, maxLon, maxLat] = bbox(featureCol);
      map.fitBounds([minLon, minLat, maxLon, maxLat], { padding: 20 });
    }
  }, [featureCol]);

  return null;
}

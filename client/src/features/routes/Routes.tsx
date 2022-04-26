import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMapData } from '../map/mapSlice';
import ItineraryContainer from './ItineraryContainer';
import {
  fetchRoutes,
  select as selectRoute,
  selectError,
  selectItinearies,
} from './routesSlice';

function Routes() {
  const dispatch = useAppDispatch();
  const [sel, setSel] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const itineraries = useAppSelector(selectItinearies);
  const mapData = useAppSelector(selectMapData);
  const error = useAppSelector(selectError);

  useEffect(() => {
    const coords = mapData.coordinates;
    if (coords.from) {
      dispatch(selectRoute(null));
      dispatch(fetchRoutes(coords.from, coords.to));
    }
  }, [mapData]);

  useEffect(() => {
    if (sel) dispatch(selectRoute(sel));
  }, [sel]);

  useEffect(() => {
    if (error && error.type === 'noData') setMessage(error.message);
  }, [error]);

  const handleClick = (id: string) => setSel(id);

  return (
    <div>
      <div>
        {message ||
          (itineraries &&
            itineraries.map((i) => (
              <div
                onClick={() => handleClick(i.id)}
                onKeyDown={() => handleClick(i.id)}
                role="button"
                tabIndex={0}
                key={`${i.id}div`}
              >
                <ItineraryContainer
                  it={i}
                  key={i.id}
                  sel={sel}
                  origin={mapData.names.from!}
                  destination={mapData.names.to!}
                />
              </div>
            )))}
      </div>
    </div>
  );
}

export default Routes;

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectMapData } from '../map/mapSlice';
import ItineraryContainer from './ItineraryContainer';
import {
  fetchRoutes,
  select as selectRoute,
  error as setError,
  selectError,
  selectItinearies,
} from './routesSlice';

function Routes() {
  const dispatch = useAppDispatch();
  const [sel, setSel] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);

  const itineraries = useAppSelector(selectItinearies);
  const mapData = useAppSelector(selectMapData);
  const error = useAppSelector(selectError);

  useEffect(() => {
    const coords = mapData.coordinates;
    if (coords.from) {
      dispatch(setError(null));
      dispatch(selectRoute(null));
      dispatch(fetchRoutes(coords.from, coords.to));
    }
  }, [mapData]);

  useEffect(() => {
    if (sel) dispatch(selectRoute(sel));
    else dispatch(selectRoute(null));
  }, [sel]);

  useEffect(() => {
    if (error) {
      if (error.type === 'noData') setMessage(error.message);
      else setMessage('Something went wrong...');
    } else setMessage(null);
  }, [error]);

  const handleClick = (id: string) => setSel(sel === id ? '' : id);

  return (
    <Box mt={2} sx={{ overflow: 'scroll' }}>
      <TransitionGroup>
        {message ||
          (itineraries &&
            itineraries.map((i) => (
              <Collapse key={`${i.id}div`}>
                <Box
                  onClick={() => handleClick(i.id)}
                  onKeyDown={() => handleClick(i.id)}
                  role="button"
                  tabIndex={0}
                  m={1}
                  key={`${i.id}box`}
                >
                  <ItineraryContainer
                    it={i}
                    key={i.id}
                    sel={sel}
                    origin={mapData.names.from!}
                    destination={mapData.names.to!}
                  />
                  <Divider />
                </Box>
              </Collapse>
            )))}
      </TransitionGroup>
    </Box>
  );
}

export default Routes;

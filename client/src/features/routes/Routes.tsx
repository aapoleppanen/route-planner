import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { QueryVariables, selectSearchData } from '../search/searchSlice';
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
  const searchData = useAppSelector(selectSearchData);
  const error = useAppSelector(selectError);

  useEffect(() => {
    const coords = searchData.coordinates;
    if (coords.from) {
      dispatch(setError(null));
      dispatch(selectRoute(null));
      if (searchData.queryVariables) {
        dispatch(
          fetchRoutes(coords.from, coords.to, {
            queryVariables: { ...searchData.queryVariables },
          }),
        );
      } else dispatch(fetchRoutes(coords.from, coords.to));
    }
  }, [searchData]);

  useEffect(() => {
    if (sel) dispatch(selectRoute(sel));
    else dispatch(selectRoute(null));
  }, [sel]);

  useEffect(() => {
    if (error) {
      if (error.type === 'noData') setMessage(error.message);
      else if (error.type === 'location') setMessage(error.message);
      else {
        setMessage('Something went wrong...');
      }
      setTimeout(() => {
        dispatch(setError(null));
      }, 4000);
    } else setMessage(null);
  }, [error]);

  const handleClick = (id: string) => setSel(sel === id ? '' : id);

  return (
    <Box mt={2} sx={{ overflow: 'scroll' }}>
      {(message && <Box>{message}</Box>) || (
        <TransitionGroup>
          {itineraries &&
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
                    origin={searchData.names.from!}
                    destination={searchData.names.to!}
                  />
                  <Divider />
                </Box>
              </Collapse>
            ))}
        </TransitionGroup>
      )}
    </Box>
  );
}

export default Routes;

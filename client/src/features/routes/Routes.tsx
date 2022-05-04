import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import React, { useEffect, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectSearchData } from '../search/searchSlice';
import ItineraryContainer from './ItineraryContainer';
import {
  error as setError,
  fetchRoutes,
  select as selectRoute,
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
    if (!coords.from) return;
    dispatch(setError(null));
    dispatch(selectRoute(null));
    // if no variables are defined dispatch w/o them
    if (!searchData.queryVariables) {
      dispatch(fetchRoutes(coords.from, coords.to));
      return;
    }
    // else dispatch w/ variables
    dispatch(
      fetchRoutes(coords.from, coords.to, {
        queryVariables: { ...searchData.queryVariables },
      }),
    );
  }, [searchData]);

  useEffect(() => {
    if (sel) dispatch(selectRoute(sel));
    else dispatch(selectRoute(null));
  }, [sel]);

  useEffect(() => {
    if (!error) {
      setMessage(null);
      return;
    }
    // clear the error msg after 4s
    setTimeout(() => {
      dispatch(setError(null));
    }, 4000);
    if (error.type === 'noData' || error.type === 'location') {
      setMessage(error.message);
      return;
    }
    setMessage('Something went wrong...');
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
                    origin={
                      searchData.names.from ? searchData.names.from : 'origin'
                    }
                    destination={
                      searchData.names.to ? searchData.names.to : 'destination'
                    }
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

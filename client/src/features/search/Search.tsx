import Box from '@mui/material/Box';
import { grey, purple } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import React, { useEffect, useState } from 'react';
import { SingleValue } from 'react-select';
import { useAppDispatch } from '../../app/hooks';
import { SearchFeature } from '../../app/types';
import { InputCoordinates } from '../../graphql/graphql';
import { lookUpAddress } from '../../services/search';
import { validateCoords } from '../../services/utils';
import { error } from '../routes/routesSlice';
import SearchDateTimePicker from './SearchDateTimePicker';
import SearchSelect from './SearchSelect';
import {
  setFromName,
  setSearchQuery,
  setSearchQueryNoVariables,
} from './searchSlice';

function Search() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<SearchFeature | null>();
  const [usingLocation, setUsingLocation] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  // departBy = false, arriveBy = true, default to false
  const [arriveBy, setArriveBy] = useState<boolean>(false);

  const handleChange = (value: SingleValue<SearchFeature>) => {
    try {
      if (!value) return;
      setSelected(value);
      setUsingLocation(false);
      const coords: InputCoordinates = {
        lat: value?.geometry.coordinates[1] as number,
        lon: value?.geometry.coordinates[0] as number,
      };
      if (!validateCoords(coords)) throw new Error();
      dispatch(setFromName(value.properties.name));
      if (!(time && date)) {
        dispatch(setSearchQueryNoVariables(coords));
        return;
      }
      // format date and time, to YYYY-MM-DD & hh:mm:ss
      const t = new Date(time).toLocaleTimeString();
      const d = date.toISOString().substring(0, 10);
      dispatch(
        setSearchQuery({
          coords,
          queryVariables: { arriveBy, date: d, time: t },
        }),
      );
    } catch (e) {
      dispatch(error({ type: 'other', message: 'Invalid Coordinates' }));
    }
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const coords: InputCoordinates = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          };
          // lookUpAddress throws error on invalid coordinates
          const res = await lookUpAddress(coords);
          handleChange(res.features[0]);
          setUsingLocation(true);
        } catch (e) {
          dispatch(error({ type: 'other', message: 'Invalid Coordinates' }));
        }
      },
      // if no permission is given dispatch an error
      () => dispatch(
        error({
          type: 'location',
          message: 'Location permission not given.',
        }),
      ),
    );
  };

  useEffect(() => {
    if (selected) handleChange(selected);
  }, [date, time, arriveBy]);

  return (
    <Box>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <SearchSelect handleChange={handleChange} selected={selected} />
        </Box>
        <Icon
          sx={{
            flexGrow: 0,
            alignSelf: 'center',
            m: 1,
            transform: 'translateY(-3px)',
            color: usingLocation ? purple[500] : grey[700],
          }}
          onClick={handleLocationClick}
          onKeyDown={handleLocationClick}
          tabIndex={0}
          role="button"
        >
          my_location
        </Icon>
      </Box>
      <Box>
        <SearchDateTimePicker
          date={date}
          time={time}
          arriveBy={arriveBy}
          setDate={setDate}
          setTime={setTime}
          setArriveBy={setArriveBy}
        />
      </Box>
    </Box>
  );
}

export default Search;

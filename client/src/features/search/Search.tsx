import Box from '@mui/material/Box';
import { grey, purple } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState } from 'react';
import { SingleValue } from 'react-select';
import { useAppDispatch } from '../../app/hooks';
import { SearchFeature } from '../../app/types';
import { InputCoordinates } from '../../graphql/graphql';
import { lookUpAddress } from '../../services/search';
import { validateCoords } from '../../services/utils';
import { error } from '../routes/routesSlice';
import SearchSelect from './SearchSelect';
import {
  setSearchQueryNoVariables,
  setFromName,
  setSearchQuery,
} from './searchSlice';

function Search() {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<SearchFeature | null>();
  const [usingLocation, setUsingLocation] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());

  const handleChange = (value: SingleValue<SearchFeature>) => {
    try {
      setSelected(value);
      setUsingLocation(false);
      const coords: InputCoordinates = {
        lat: value?.geometry.coordinates[1] as number,
        lon: value?.geometry.coordinates[0] as number,
      };
      if (!validateCoords(coords)) {
        throw new Error();
      }
      dispatch(setFromName(value!.properties.name));
      if (time && date) {
        const t = new Date(time).toLocaleTimeString();
        const d = date.toISOString().substring(0, 10);
        dispatch(
          setSearchQuery({
            coords,
            queryVariables: { arriveBy: false, date: d, time: t },
          }),
        );
      } else {
        dispatch(setSearchQueryNoVariables(coords));
      }
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
          const res = await lookUpAddress(coords);
          handleChange(res.features[0]);
          setUsingLocation(true);
        } catch (e) {
          dispatch(error({ type: 'other', message: 'Invalid Coordinates' }));
        }
      },
      (e) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        dispatch(
          error({
            type: 'location',
            message: 'Location permission not given.',
          }),
        ),
    );
  };

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container>
            <Grid item>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
            <Grid item>
              <TimePicker
                label="Time"
                ampm={false}
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Box>
    </Box>
  );
}

export default Search;

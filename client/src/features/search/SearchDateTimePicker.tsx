import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import React, { useState } from 'react';

function SearchDateTimePicker({
  date,
  time,
  setDate,
  setTime,
  setArriveBy,
}: {
  date: Date | null;
  time: Date | null;
  arriveBy: boolean;
  setDate: (date: Date | null) => void;
  setTime: (date: Date | null) => void;
  setArriveBy: (ab: boolean) => void;
}) {
  const [select, setSelect] = useState<string>('0');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={3.5}>
          <FormControl fullWidth>
            <Select
              labelId="select-arrival"
              id="select-arrival-id"
              data-testid="select_arrival"
              value={select}
              label=""
              onChange={(e) => {
                setArriveBy(e.target.value === '1');
                setSelect(e.target.value);
              }}
              defaultValue="0"
            >
              <MenuItem value="1">Arrive By</MenuItem>
              <MenuItem value="0">Depart By</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4.5}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => {
              if (newValue !== date) setDate(newValue);
            }}
            renderInput={(params) => (
              <TextField data-testid="date-picker" {...params} />
            )}
          />
        </Grid>
        <Grid item xs={3.5}>
          <TimePicker
            label="Time"
            ampm={false}
            value={time}
            onChange={(newValue) => {
              if (newValue !== time) setTime(newValue);
            }}
            renderInput={(params) => (
              <TextField data-testid="time-picker" {...params} />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}

export default SearchDateTimePicker;

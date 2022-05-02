import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import Collapse from '@mui/material/Collapse';
import { green, blue, orange } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { Leg } from '../../graphql/graphql';
import { ItineraryWithID } from './routesSlice';

function ItineraryContainer({
  it,
  sel,
  origin,
  destination,
}: {
  it: ItineraryWithID;
  sel: string;
  origin: string;
  destination: string;
}) {
  useEffect(() => {}, [sel]);

  const icons: Record<string, JSX.Element> = {
    WALK: <Icon>directions_walk</Icon>,
    TRAM: <Icon sx={{ color: green[500] }}>tram</Icon>,
    SUBWAY: <Icon sx={{ color: orange[500] }}>subway</Icon>,
    BUS: <Icon sx={{ color: blue[500] }}>directions_bus</Icon>,
    DEFAULT: <Icon>directions_walk</Icon>,
  };

  const timeDiff = (leg: Leg): number =>
    // eslint-disable-next-line implicit-arrow-linebreak
    Math.floor(
      (new Date(leg?.endTime).valueOf() - new Date(leg?.startTime).valueOf()) /
        1000 /
        60,
    );

  const formatTime = (time: number) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    new Date(time).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const getRouteName = (leg: Leg): string => {
    if (leg.trip?.routeShortName) return leg.trip.routeShortName;
    return '';
  };

  const handleSelected = (legs: Leg[]) => (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <Box textAlign="center">
          {formatTime(legs[0].startTime)} {origin}
        </Box>
      </Grid>
      {legs.map((leg) => (
        <Grid item key={leg?.endTime}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }} mb={2} mt={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} mr={2}>
                {icons[leg.mode!] || icons.DEFAULT}
                {getRouteName(leg)}
              </Box>
              {timeDiff(leg)} min
            </Box>
            <Box> {leg.to.name === 'Destination' ? '' : leg.to.name}</Box>
          </Box>
        </Grid>
      ))}
      <Grid item>
        <Box textAlign="center">
          {formatTime(legs[legs.length - 1].endTime)} {destination}
        </Box>
      </Grid>
    </Grid>
  );

  const handleNoSelected = (legs: Leg[]) => (
    <Grid container spacing={0} sx={{ justifyContent: 'space-evenly' }}>
      <Grid item>
        <Box>{formatTime(legs[0].startTime)}</Box>
      </Grid>
      {legs.map((leg) => (
        <Grid item key={leg?.endTime}>
          <Box
            key={leg?.endTime}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {icons[leg.mode!] || icons.DEFAULT}
            {leg.mode === 'WALK' ? <>{timeDiff(leg)} min</> : getRouteName(leg)}
          </Box>
        </Grid>
      ))}
      <Grid item>
        <Box>{formatTime(legs[legs.length - 1].endTime)}</Box>
      </Grid>
    </Grid>
  );

  return (
    <Box data-testId="it_container">
      <Collapse in={sel === it.id}>{handleSelected(it.legs as Leg[])}</Collapse>
      <Collapse in={sel !== it.id}>
        {handleNoSelected(it.legs as Leg[])}
      </Collapse>
    </Box>
  );
}

export default ItineraryContainer;

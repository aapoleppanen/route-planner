import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import {
  blue, green, grey, orange,
} from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import React from 'react';
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
  const icons: Record<string, JSX.Element> = {
    WALK: <Icon>directions_walk</Icon>,
    TRAM: <Icon sx={{ color: green[500] }}>tram</Icon>,
    SUBWAY: <Icon sx={{ color: orange[500] }}>subway</Icon>,
    BUS: <Icon sx={{ color: blue[500] }}>directions_bus</Icon>,
    DEFAULT: <Icon>directions_walk</Icon>,
  };

  const timeDiff = (leg: Leg): number => Math.floor(
    (new Date(leg?.endTime).valueOf() - new Date(leg?.startTime).valueOf()) /
        1000 /
        60,
  );

  const formatTime = (time: number) => new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getRouteName = (leg: Leg): string => {
    if (!leg.trip?.routeShortName) return '';
    return leg.trip.routeShortName;
  };

  const formatStop = (leg: Leg): string | JSX.Element => {
    if (!leg.from.name || leg.from.name === 'Origin') return '';
    if (leg.from.stop && leg.from.stop.code) {
      return (
        <>
          <Box>{formatTime(leg.startTime)} </Box>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            {leg.from.name} {leg.from.stop.code}
          </Box>
          {/* invisible box to truly center, central box */}
          <Box sx={{ opacity: 0 }}>00:00</Box>
        </>
      );
    }
    return leg.from.name;
  };

  const handleSelected = (legs: Leg[]) => (
    <Grid container spacing={1} pl={1} direction="column">
      <Grid
        item
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Box>{formatTime(legs[0].startTime)} </Box>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>{origin}</Box>
        <Box sx={{ opacity: 0 }}>00:00</Box>
      </Grid>
      {legs.map((leg) => (
        <React.Fragment key={leg?.endTime}>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {formatStop(leg)}
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Divider
              orientation="vertical"
              sx={{
                height: 15,
                borderRightWidth: 3,
                borderRightStyle: 'dotted',
                borderRightColor: grey[500],
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }} mb={2} mt={2}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} mr={2}>
                {leg.mode ? icons[leg.mode] : icons.DEFAULT}
                {getRouteName(leg)}
              </Box>
              {timeDiff(leg)} min
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                height: 15,
                borderRightWidth: 3,
                borderRightStyle: 'dotted',
                borderRightColor: grey[500],
              }}
            />
          </Grid>
        </React.Fragment>
      ))}
      <Grid
        item
        sx={{
          display: 'flex',
          justifYContent: 'flex-start',
        }}
      >
        <Box>{formatTime(legs[legs.length - 1].endTime)} </Box>
        <Box sx={{ flexGrow: 1, textAlign: 'center' }}>{destination}</Box>
        <Box sx={{ opacity: 0 }}>00:00</Box>
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
            {leg.mode ? icons[leg.mode] : icons.DEFAULT}
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
    <Box data-testid="it_container">
      <Collapse in={sel === it.id}>{handleSelected(it.legs as Leg[])}</Collapse>
      <Collapse in={sel !== it.id}>
        {handleNoSelected(it.legs as Leg[])}
      </Collapse>
    </Box>
  );
}

export default ItineraryContainer;

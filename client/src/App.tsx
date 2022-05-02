import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Map from './features/map/Map';
import Routes from './features/routes/Routes';
import Search from './features/search/Search';

function App() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }} spacing={0}>
      <Grid item xs={4}>
        <Box m={2}>
          <h1>Route-Planner</h1>
          <Search />
          <Routes />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import Map from './features/map/Map';
import Routes from './features/routes/Routes';
import Search from './features/search/Search';

function App() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }} spacing={0}>
      <Grid item xs={12} md={4} order={{ xs: 1, md: -1 }}>
        <Box
          p={2}
          sx={{ display: 'flex', overflow: 'hidden', flexDirection: 'column' }}
          height={{ xs: '70vh', md: '100vh' }}
        >
          <h1>Route-Planner</h1>
          <Search />
          <Routes />
        </Box>
      </Grid>
      <Grid item xs={12} md={8} height={{ xs: '30vh', md: '100vh' }}>
        <Map />
      </Grid>
    </Grid>
  );
}

export default App;

import React from 'react';
import Routes from './features/routes/Routes';
// import Map from './features/map/Map';
import Map from './features/map/Map';
import Search from './features/search/Search';

function App() {
  return (
    <div>
      <Search />
      <Routes />
      <Map />
    </div>
  );
}

export default App;

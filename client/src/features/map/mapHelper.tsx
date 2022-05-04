import { LayerProps } from 'react-map-gl';

// used to generate style.json
// export const style: mapboxgl.Style = generateStyle({
//   sourcesUrl: 'https://cdn.digitransit.fi/',
//   components: {
//     // Set each layer you want to include to true

//     // Styles
//     base: { enabled: true }, // Enabled by default
//     municipal_borders: { enabled: false },
//     routes: { enabled: false },
//     text: { enabled: true }, // Enabled by default
//     subway_entrance: { enabled: false },
//     poi: { enabled: false },
//     park_and_ride: { enabled: false },
//     ticket_sales: { enabled: false },
//     stops: { enabled: false },
//     citybikes: { enabled: false },
//     ticket_zones: { enabled: false },

//     // Themes
//     text_sv: { enabled: false },
//     text_fisv: { enabled: false },
//     regular_routes: { enabled: false },
//     near_bus_routes: { enabled: false },
//     regular_stops: { enabled: false },
//     near_bus_stops: { enabled: false },
//     print: { enabled: false },
//     greyscale: { enabled: false },
//     simplified: { enabled: false },
//     '3d': { enabled: false },
//   },

//   routeFilter: [],
// });

export const modeToColor = (mode: string) => {
  switch (mode) {
    case 'BUS':
      return 'blue';
    case 'WALK':
      return 'grey';
    case 'SUBWAY':
      return 'orange';
    case 'TRAM':
      return 'green';
    default:
      return 'black';
  }
};

export const layerStyle: LayerProps = {
  id: 'data',
  type: 'line',
  paint: {
    'line-color': ['get', 'color'],
    'line-width': 5,
  },
};

export default {};

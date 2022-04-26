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

  const getIcon = (mode: string) => {
    switch (mode) {
      case 'WALK':
        return 'https://www.freeiconspng.com/thumbs/walking-icon/walking-icon-1.png';
      case 'SUBWAY':
        return 'https://www.freeiconspng.com/thumbs/walking-icon/walking-icon-1.png';
      case 'BUS':
        return 'https://www.freeiconspng.com/thumbs/walking-icon/walking-icon-1.png';
      case 'TRAM':
        return 'https://www.freeiconspng.com/thumbs/walking-icon/walking-icon-1.png';
      default:
        return 'https://www.freeiconspng.com/thumbs/walking-icon/walking-icon-1.png';
    }
  };

  const handleSelected = (legs: Leg[]) => (
    <div>
      {origin}
      {legs.map((leg) => (
        <div key={leg?.endTime}>
          {new Date(leg?.startTime).toLocaleTimeString('fi-FI')}-{leg.mode}
          <img
            src={getIcon(leg.mode!)}
            alt="transp_icon"
            style={{ width: 15 }}
          />
          -{new Date(leg?.endTime).toLocaleTimeString('fi-FI')}
          {leg.to.name === 'Destination' ? '' : leg.to.name}
        </div>
      ))}
      {destination}
    </div>
  );

  const handleNoSelected = (legs: Leg[]) => (
    <div>
      {legs.map((leg) => (
        <div key={leg?.endTime}>
          {new Date(leg?.startTime).toLocaleTimeString('fi-FI')}-{leg.mode}-
          {new Date(leg?.endTime).toLocaleTimeString('fi-FI')}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {sel === it.id && it.legs
        ? handleSelected(it.legs as Leg[])
        : handleNoSelected(it.legs as Leg[])}
    </div>
  );
}

export default ItineraryContainer;

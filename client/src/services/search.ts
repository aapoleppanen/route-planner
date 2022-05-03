import { InputCoordinates } from '../graphql/graphql';
import { isValidResponse } from './utils';

export async function searchForAddress(text: string) {
  const params = new URLSearchParams({ text, size: '5' });
  const response = await fetch(
    `http://api.digitransit.fi/geocoding/v1/search?${params}`,
  );
  const out = await response.json();
  if (!isValidResponse(out)) throw new Error('Invalid response...');
  return out;
}

export async function lookUpAddress(coords: InputCoordinates) {
  const params = new URLSearchParams({
    'point.lat': coords.lat.toString(),
    'point.lon': coords.lon.toString(),
    size: '1',
  });
  const response = await fetch(
    `http://api.digitransit.fi/geocoding/v1/reverse?${params}`,
  );
  const out = await response.json();
  if (!isValidResponse(out)) throw new Error('Invalid response...');
  return out;
}

export default {};

import { InputCoordinates } from '../graphql/graphql';
import { isValidResponse } from './utils';
import URLS from '../app/config';

export async function searchForAddress(text: string) {
  const params = new URLSearchParams({ text, size: '5' });
  const response = await fetch(`${URLS.ADDRESS_API_BASE_URL}${params}`);
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
  const response = await fetch(`${URLS.LOOKUP_API_BASE_URL}${params}`);
  const out = await response.json();
  if (!isValidResponse(out)) throw new Error('Invalid response...');
  return out;
}

export default {};

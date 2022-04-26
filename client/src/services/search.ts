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

export default {};

import { SearchResponse } from '../app/types';

export const isValidResponse = (res: SearchResponse): res is SearchResponse =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (res as SearchResponse).geocoding.errors === undefined;

export default {};

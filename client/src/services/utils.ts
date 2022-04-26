import { SearchResponse } from '../app/types';
import { InputCoordinates } from '../graphql/graphql';

const isNumber = (entry: unknown): entry is number =>
  // eslint-disable-next-line implicit-arrow-linebreak
  typeof entry === 'number' || entry instanceof Number;

export const isValidResponse = (res: SearchResponse): res is SearchResponse =>
  // eslint-disable-next-line implicit-arrow-linebreak
  (res as SearchResponse).geocoding.errors === undefined;

export const validateCoords = (
  coords: InputCoordinates,
): coords is InputCoordinates =>
  // eslint-disable-next-line implicit-arrow-linebreak
  isNumber((coords as InputCoordinates).lat) &&
  isNumber((coords as InputCoordinates).lon);

export default {};

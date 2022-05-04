import { useQuery } from 'urql';
import { InputCoordinates, RoutesDocument } from '../graphql/graphql';
import client from '../app/client';
import type { QueryVariables } from '../features/search/searchSlice';

export const useRoute = (from: InputCoordinates, to: InputCoordinates) => {
  const [result] = useQuery({
    query: RoutesDocument,
    variables: {
      from,
      to,
    },
  });
  return [result];
};

export const getRoutes = async ({
  from,
  to,
  variables,
}: {
  from: InputCoordinates;
  to: InputCoordinates;
  variables?: QueryVariables;
}) => {
  if (!variables) return client.query(RoutesDocument, { from, to }).toPromise();
  return client
    .query(RoutesDocument, { from, to, ...variables.queryVariables })
    .toPromise();
};

export default {};

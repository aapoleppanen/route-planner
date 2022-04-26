import { useQuery } from 'urql';
import { InputCoordinates, RoutesDocument } from '../graphql/graphql';
import client from '../app/client';

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

export const getRoutes = async (
  from: InputCoordinates,
  to: InputCoordinates,
) => {
  const result = await client.query(RoutesDocument, { from, to }).toPromise();
  return result;
};

export default {};

// const { data, fetching, error } = result;

// if (fetching) return <p>Loading...</p>;
// if (error) return <p>Oh no... {error.message}</p>;

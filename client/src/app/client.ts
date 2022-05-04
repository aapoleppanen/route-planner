import { createClient } from 'urql';
import URLS from './config';

// create graphql client
const client = createClient({
  url: URLS.GRAPHQL_URL,
});

export default client;

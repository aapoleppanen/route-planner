import { createClient } from 'urql';
import { API_URL } from './config';

// create graphql client
const client = createClient({
  url: API_URL,
});

export default client;

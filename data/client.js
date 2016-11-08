import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { IS_SERVER } from '../util/website';
import config from '../config';

export default function getClient(headers) {
  let client;
  if (IS_SERVER || !window.apolloClient) {
    client = new ApolloClient({
      networkInterface: createNetworkInterface({ uri: config.GRAPHQL_ENDPOINT }),
      ssrMode: true,
      headers,
    });
    if (IS_SERVER) {
      return client;
    }
    window.apolloClient = client;
  }
  return window.apolloClient;
}

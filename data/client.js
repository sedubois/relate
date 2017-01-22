import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { GRAPHQL_ENDPOINT } from '../config';
import { getToken } from '../util/auth';

function createClient(headers) {
  const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

  networkInterface.use([{
    applyMiddleware(req, next) {
      /* eslint-disable no-param-reassign */
      if (!req.options.headers) {
        req.options.headers = {};
      }
      const token = getToken();
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      /* eslint-enable no-param-reassign */
      next();
    },
  }]);

  return new ApolloClient({
    networkInterface,
    ssrMode: !process.browser,
    headers,
    dataIdFromObject: result => result.id || null,
  });
}

export default function getClient(headers) {
  let client;
  if (!process.browser || !window.apolloClient) {
    client = createClient(headers);
    if (!process.browser) {
      return client;
    }
    window.apolloClient = client;
  }
  return window.apolloClient;
}

export function resetStore() {
  if (process.browser) {
    window.apolloClient.resetStore();
  }
}

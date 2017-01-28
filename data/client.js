import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { GRAPHQL_ENDPOINT } from '../config';

let apolloClient = null;

function createClient(headers, token) {
  const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

  networkInterface.use([{
    applyMiddleware(req, next) {
      /* eslint-disable no-param-reassign */
      if (!req.options.headers) {
        req.options.headers = {};
      }
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

export default function getClient(headers, userToken) {
  let client;
  if (!process.browser || !apolloClient) {
    client = createClient(headers, userToken);
    if (!process.browser) {
      return client;
    }
    apolloClient = client;
  }
  return apolloClient;
}

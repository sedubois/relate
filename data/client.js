import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { IS_SERVER } from '../util/website';
import config from '../config';
import { getToken } from '../util/auth';

function createClient(headers) {
  const networkInterface = createNetworkInterface({ uri: config.GRAPHQL_ENDPOINT });

  networkInterface.use([{
    applyMiddleware(req, next) {
      /* eslint-disable no-param-reassign */
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers.authorization = getToken() || null;
      /* eslint-enable no-param-reassign */
      next();
    },
  }]);

  return new ApolloClient({ networkInterface, ssrMode: true, headers });
}

export default function getClient(headers) {
  let client;
  if (IS_SERVER || !window.apolloClient) {
    client = createClient(headers);
    if (IS_SERVER) {
      return client;
    }
    window.apolloClient = client;
  }
  return window.apolloClient;
}

export function resetStore() {
  window.apolloClient.resetStore();
}

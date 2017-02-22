import ApolloClient, { createNetworkInterface } from 'apollo-client';

let apolloClient = null;

function createClient({ authToken }) {
  const networkInterface = createNetworkInterface({ uri: GRAPHQL_ENDPOINT });

  networkInterface.use([{
    applyMiddleware(req, next) {
      /* eslint-disable no-param-reassign */
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers.authorization = authToken ? `Bearer ${authToken}` : null;
      /* eslint-enable no-param-reassign */
      next();
    },
  }]);

  return new ApolloClient({
    networkInterface,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    connectToDevTools: process.browser,
  });
}

export default function getClient(props) {
  let client;
  if (!process.browser || !apolloClient) {
    // TODO create client only once per server request instead of twice as now
    // (because of double-render, because of getDataFromTree call + normal render)
    // TODO 2: remember Apollo client server-side by binding to client session?
    client = createClient(props);
    if (!process.browser) {
      return client;
    }
    apolloClient = client;
  }
  return apolloClient;
}

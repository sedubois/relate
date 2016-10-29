import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({ uri: process.env.GRAPHQL_ENDPOINT }),
});

export default client;

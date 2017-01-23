import getClient from './client';
import getStore from './store';

export default function getClientAndStore(initialState, headers, userToken) {
  const apolloClient = getClient(headers, userToken);
  const reduxStore = getStore(apolloClient, initialState);
  return {
    apolloClient,
    reduxStore,
  };
}

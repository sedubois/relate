import getClient from './client';
import getStore from './store';

export default function getClientAndStore(initialState, headers) {
  const apolloClient = getClient(headers);
  const reduxStore = getStore(apolloClient, initialState);
  return {
    apolloClient,
    reduxStore,
  };
}

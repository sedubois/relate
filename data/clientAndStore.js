import getClient from './client';
import getStore from './store';

export default function getClientAndStore(initialState, props) {
  const apolloClient = getClient(props);
  const reduxStore = getStore(apolloClient, initialState);
  return {
    apolloClient,
    reduxStore,
  };
}

import getClient from './client';
import getStore from './store';

export default function getClientAndStore(initialState, headers) {
  const client = getClient(headers);
  const store = getStore(client, initialState);
  return {
    client,
    store,
  };
}

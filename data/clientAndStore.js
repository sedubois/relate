import getClient from './client';
import createStore from './store';

export default function initClientAndStore(initialState, headers) {
  const isServer = typeof window === 'undefined';
  if (isServer || !window.clientAndStore) {
    const client = getClient(headers);
    const clientAndStore = {
      client,
      store: createStore(isServer, client, initialState),
    };
    if (isServer) {
      return clientAndStore;
    }
    window.clientAndStore = clientAndStore;
  }
  return window.clientAndStore;
}

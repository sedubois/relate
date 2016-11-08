import getClient from './client';
import createStore from './store';
import { IS_SERVER } from '../util/website';

export default function initClientAndStore(initialState, headers) {
  if (IS_SERVER || !window.clientAndStore) {
    const client = getClient(headers);
    const clientAndStore = {
      client,
      store: createStore(IS_SERVER, client, initialState),
    };
    if (IS_SERVER) {
      return clientAndStore;
    }
    window.clientAndStore = clientAndStore;
  }
  return window.clientAndStore;
}

import { createStore } from 'redux';
import { IS_SERVER } from '../util/website';
import createMiddleware from './middleware';
import getReducer from './reducer';

export default function getStore(client, initialState) {
  let store;
  if (IS_SERVER || !window.reduxStore) {
    const middleware = createMiddleware(client.middleware());
    store = createStore(getReducer(client), initialState, middleware);
    if (IS_SERVER) {
      return store;
    }
    window.reduxStore = store;
  }
  return window.reduxStore;
}

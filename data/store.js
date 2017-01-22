import { createStore } from 'redux';
import createMiddleware from './middleware';
import getReducer from './reducer';

export default function getStore(client, initialState) {
  let store;
  if (!process.browser || !window.reduxStore) {
    const middleware = createMiddleware(client.middleware());
    store = createStore(getReducer(client), initialState, middleware);
    if (!process.browser) {
      return store;
    }
    window.reduxStore = store;
  }
  return window.reduxStore;
}

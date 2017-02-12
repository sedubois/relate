import { createStore } from 'redux';
import createMiddleware from './middleware';
import getReducer from './reducer';

let reduxStore = null;

export default function getStore(client, initialState) {
  let store;
  if (!process.browser || !reduxStore) {
    const middleware = createMiddleware(client.middleware());
    store = createStore(getReducer(client), initialState, middleware);
    if (!process.browser) {
      return store;
    }
    reduxStore = store;
  }
  return reduxStore;
}

import { createStore } from 'redux';
import createMiddleware from './middleware';
import getReducer from './reducer';

export default function createMiddlewareAndStore(isServer, client, initialState) {
  const middleware = createMiddleware(isServer, client.middleware());
  return createStore(getReducer(client), initialState, middleware);
}

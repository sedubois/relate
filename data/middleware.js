import { applyMiddleware, compose } from 'redux';

export default function createMiddleware(isServer, clientMiddleware) {
  const universalMiddleware = applyMiddleware(clientMiddleware);
  return (isServer || !window.devToolsExtension)
    ? universalMiddleware
    : compose(universalMiddleware, window.devToolsExtension());
}

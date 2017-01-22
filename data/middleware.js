import { applyMiddleware, compose } from 'redux';

export default function createMiddleware(clientMiddleware) {
  const universalMiddleware = applyMiddleware(clientMiddleware);
  return (process.browser && window.devToolsExtension)
    ? compose(universalMiddleware, window.devToolsExtension())
    : universalMiddleware;
}

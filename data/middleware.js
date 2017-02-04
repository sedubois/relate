import { applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function createMiddleware(clientMiddleware) {
  const universalMiddleware = applyMiddleware(
    thunkMiddleware,
    clientMiddleware,
  );
  return (process.browser && window.devToolsExtension)
    ? compose(universalMiddleware, window.devToolsExtension())
    : universalMiddleware;
}

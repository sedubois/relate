import { applyMiddleware, compose } from 'redux';
import { IS_BROWSER } from '../util/website';

export default function createMiddleware(clientMiddleware) {
  const universalMiddleware = applyMiddleware(clientMiddleware);
  return (IS_BROWSER && window.devToolsExtension)
    ? compose(universalMiddleware, window.devToolsExtension())
    : universalMiddleware;
}

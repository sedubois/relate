const LRUCache = require('lru-cache');
const routes = require('../universal/routes');

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});

function getCacheKey(req) {
  return `${req.url}-${JSON.stringify(req.session.user)}`;
}

function renderAndCache(app) {
  const handle = app.getRequestHandler();

  return (req, res) => {
    const key = getCacheKey(req);
    if (ssrCache.has(key)) {
      console.log(`CACHE HIT:  ${key}`);
      return res.send(ssrCache.get(key));
    }

    if (req.url === '/favicon.ico'
      || req.url.startsWith('/_')
      || req.url.startsWith('/static')) {
      return handle(req, res);
    }

    const { route, params } = routes.match(req.url);
    if (!route) {
      return handle(req, res);
    }

    app.renderToHTML(req, res, route.page, params)
      .then((html) => {
        console.log(`CACHE MISS:  ${key}`);
        ssrCache.set(key, html);
        res.send(html);
      })
      .catch(err => app.renderError(err, req, res, route.page, params));

    return undefined;
  };
}

module.exports = renderAndCache;

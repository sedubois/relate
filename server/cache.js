const LRUCache = require('lru-cache');
const routes = require('../universal/routes');

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});

function getCacheKey(req) {
  return `${req.url}-${JSON.stringify(req.session.user)}`;
}

function cache(app) {
  return (req, res, next) => {
    const key = getCacheKey(req);
    if (!app.dev && ssrCache.has(key)) {
      res.send(ssrCache.get(key));
    } else {
      const { route, params } = routes.match(req.url);
      if (!route
        || req.url === '/favicon.ico'
        || req.url === '/__webpack_hmr') {
        next();
      } else {
        app.renderToHTML(req, res, route.page, params)
          .then((html) => {
            ssrCache.set(key, html);
            res.send(html);
          })
          .catch(err => app.renderError(err, req, res, route.page, params));
      }
    }
  };
}

module.exports = cache;

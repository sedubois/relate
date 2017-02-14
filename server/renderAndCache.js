const LRUCache = require('lru-cache');
const routes = require('../universal/routes');

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1 hour
});

function renderAndCache(app) {
  const handle = app.getRequestHandler();

  return (req, res) => {
    if (ssrCache.has(req.url)) {
      console.log(`CACHE HIT: ${req.url}`);
      return res.send(ssrCache.get(req.url));
    }

    const { route, params } = routes.match(req.url);
    if (!route) {
      return handle(req, res);
    }

    app.renderToHTML(req, res, route.page, params)
      .then((html) => {
        console.log(`CACHE MISS: ${req.url}`);
        ssrCache.set(req.url, html);
        res.send(html);
      })
      .catch(err => app.renderError(err, req, res, route.page, params));

    return undefined;
  };
}

module.exports = renderAndCache;

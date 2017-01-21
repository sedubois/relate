const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

function customRoute(pathname) {
  return (req, res) => app.render(req, res, pathname, req.params, req.query);
}

app.prepare().then(() => {
  const server = express();

  // Matcher for all pathnames that should be handled as-is by next (no need for dynamic routing).
  // /_.* represents all pathnames starting with underscore, e.g /__webpack_hmr, etc.
  // This fall-through can't be simply achieved with a wildcard (*) as the last route,
  // because of the /:slug route which would catch them first.
  server.get(/^\/(_.*|about|discover|favicon.ico)$/, handle);

  server.get('/track/:id', customRoute('/track'));

  server.get('/:slug', customRoute('/profile'));

  server.get('*', handle);

  server.listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000');
  });
});

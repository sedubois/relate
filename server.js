const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const profileMatch = route('/:slug');
const trackMatch = route('/track/:id');

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname } = parse(req.url);
      // leave untouched routes like /__webpack_hmr or /_next/-/pages/
      const hasUnderscore = pathname[1] && pathname[1] === '_';
      if (hasUnderscore) {
        handle(req, res);
        return;
      }

      const profileParams = profileMatch(pathname);
      if (profileParams !== false) {
        app.render(req, res, '/profile', profileParams);
        return;
      }

      const trackParams = trackMatch(pathname);
      if (trackParams !== false) {
        app.render(req, res, '/track', trackParams);
        return;
      }

      handle(req, res);
    })
      .listen(3000, (err) => {
        if (err) {
          throw err;
        }
        console.log('> Ready on http://localhost:3000');
      });
  });

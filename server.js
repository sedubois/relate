const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();
const match = route('/:slug');

app.prepare()
  .then(() => {
    createServer((req, res) => {
      const { pathname } = parse(req.url);
      const params = match(pathname);
      // leave untouched routes like /__webpack_hmr or /_next/-/pages/
      const hasUnderscore = pathname[1] && pathname[1] === '_';
      if (params === false || hasUnderscore) {
        handle(req, res);
        return;
      }

      app.render(req, res, '/profile', params);
    })
      .listen(3000, (err) => {
        if (err) {
          throw err;
        }
        console.log('> Ready on http://localhost:3000');
      });
  });

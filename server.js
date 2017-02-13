const express = require('express');
const bodyParser = require('body-parser');
const requestLanguage = require('express-request-language');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const next = require('next');
const { readFileSync } = require('fs');
const { SESSION_SECRET } = require('./config');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const nextHandler = app.getRequestHandler();
const routesHandler = routes.getRequestHandler(app);
// TODO store more persistently (this only survives while deployment is on same machine)
const store = new FileStore({ path: '/tmp/sessions' });

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(session({
    secret: SESSION_SECRET,
    store,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    httpOnly: true,
  }));
  server.use(requestLanguage({ languages: ['en', 'fr'] }));

  server.post('/api/auth/logout', (req, res) => {
    delete req.session.user; // eslint-disable-line no-param-reassign
    return res.json({});
  });

  server.patch('/api/session', (req, res) => {
    if (!req.session.user) {
      req.session.user = {}; // eslint-disable-line no-param-reassign
    }
    Object.assign(req.session.user, req.body); // eslint-disable-line no-param-reassign
    res.json({});
  });

  server.get('/api/intl/:locale', (req, res) => {
    // doesn't work in withIntl.js: https://github.com/zeit/next.js/issues/1091#issuecomment-279241498
    const locale = req.params.locale;
    const messageFile = require.resolve(`./data/intl/${locale}.json`);
    const messages = JSON.parse(readFileSync(messageFile, 'utf8'));
    res.json(messages);
  });

  // Matcher for all pathnames that should be handled as-is by next (no need for dynamic routing).
  // /_.* represents all pathnames starting with underscore, e.g /__webpack_hmr, etc.
  // This fall-through can't be simply achieved with a wildcard (*) as the last route,
  // because of the /:slug route which would catch them first.
  server.get(/^\/_.*$/, (req, res) => nextHandler(req, res));

  server.use(routesHandler).listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
  });
});

const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const renderAndCache = require('./renderAndCache');
const session = require('./session');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(session);

  server.post('/api/auth/logout', (req, res) => {
    delete req.session.user; // eslint-disable-line no-param-reassign
    return res.json({});
  });

  server.patch('/api/auth', (req, res) => {
    if (!req.session.user) {
      req.session.user = {}; // eslint-disable-line no-param-reassign
    }
    Object.assign(req.session.user, req.body); // eslint-disable-line no-param-reassign
    res.json({});
  });

  server.use(renderAndCache(app, dev)).listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
  });
});

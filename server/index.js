const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const cache = require('./cache');
const { configSession, defaultSessionData } = require('./session');
const authApi = require('./authApi');
const promisify = require('../universal/promisify');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

module.exports = app.prepare().then(async () => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(configSession);
  server.use(defaultSessionData);
  server.use('/api/auth', authApi);
  server.use(cache(app));
  server.use((req, res) => handle(req, res));
  const port = 3000;
  await promisify(server, 'listen')(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  return { app, server };
});

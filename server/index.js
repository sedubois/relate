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
const server = express();

module.exports = app.prepare()
  .then(() => server
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(configSession)
    .use(defaultSessionData)
    .use('/api/auth', authApi)
    .use(cache(app))
    .use((req, res) => handle(req, res)))
  .then(() => promisify(server, 'listen')(3000))
  // eslint-disable-next-line no-console
  .then(res => console.log(`> Ready on http://localhost:${res.handle.address().port}`))
  .then(() => ({ app, server }))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

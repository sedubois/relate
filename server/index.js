const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const cache = require('./cache');
const { configSession, defaultSessionData } = require('./session');
const authApi = require('./authApi');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const port = 3000;

module.exports = app.prepare()
  .then(() => server
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(configSession)
    .use(defaultSessionData)
    .use('/api/auth', authApi)
    .use(cache(app))
    .use((req, res) => handle(req, res)))
  .then(() => server.listen(port, () => console.log(`> Ready on http://localhost:${port}`)))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const cache = require('./cache');
const { configSession, defaultSessionData } = require('./session');
const authApi = require('./authApi');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(configSession);
  server.use(defaultSessionData);
  server.use('/api/auth', authApi);
  server.use(cache(app));
  server.use((req, res) => handle(req, res));

  server.listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
  });
});

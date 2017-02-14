const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');
const renderAndCache = require('./renderAndCache');
const session = require('./session');
const authApi = require('./authApi');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(session);
  server.use('/api/auth', authApi);

  server.use(renderAndCache(app)).listen(3000, (err) => {
    if (err) {
      throw err;
    }
    console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
  });
});

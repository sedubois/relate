const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { SESSION_SECRET } = require('../universal/config');

// TODO store more persistently (this only survives while deployment is on same machine)
const store = new FileStore({ path: '/tmp/sessions' });

module.exports = session({
  secret: SESSION_SECRET,
  store,
  resave: false,
  rolling: true,
  saveUninitialized: true,
  httpOnly: true,
});

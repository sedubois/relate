const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { SESSION_SECRET } = require('../universal/config');
const acceptLanguage = require('./acceptLanguage');
const routes = require('../universal/routes');

// TODO store more persistently (this only survives while deployment is on same machine)
const store = new FileStore({ path: '/tmp/sessions' });

module.exports = {
  configSession: session({
    secret: SESSION_SECRET,
    store,
    resave: false,
    rolling: true,
    saveUninitialized: true,
    httpOnly: true,
  }),
  defaultSessionData(req, res, next) {
    if (!routes.isNextPath(req.url) && !req.session.user) {
      req.session.user = { // eslint-disable-line no-param-reassign
        locale: acceptLanguage(req),
      };
    }
    next();
  },
};

const nextRoutes = require('next-routes');

module.exports = nextRoutes()
  .add('/')
  .add('about')
  .add('discover')
  .add('retreat', '/retreat/:id')
  .add('track', '/track/:id')
  .add('profile', '/:slug');

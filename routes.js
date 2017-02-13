const nextRoutes = require('next-routes');

const routes = nextRoutes();
routes.add('retreat', '/retreat/:id');
routes.add('track', '/track/:id');
routes.add('profile', '/:slug');

module.exports = routes;

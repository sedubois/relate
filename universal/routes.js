const nextRoutes = require('next-routes');

const routes = nextRoutes();
routes.add('about', '/about');
routes.add('discover', '/discover');
routes.add('retreat', '/retreat/:id');
routes.add('track', '/track/:id');
routes.add('profile', '/:slug');

module.exports = routes;

const routes = require('express').Router();
const adminRoute = require('./adminRoute');
const shopRoute = require('./shopRoute');

// console.log(adminRoute);

routes.use('/admin', adminRoute.routes);
routes.use('/', shopRoute);


module.exports = routes;
const routes = require('express').Router();
const adminRoute = require('./adminRoute');
const shopRoute = require('./shopRoute');

routes.use('/', adminRoute);
routes.use('/', shopRoute);


module.exports = routes;
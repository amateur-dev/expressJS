const routes = require('express').Router();
const adminRoute = require('./adminRoute');
const shopRoute = require('./shopRoute');
const pageNotFoundError = require('./pageNotFound');

routes.use('/admin', adminRoute);
routes.use('/', shopRoute);
routes.use("*", pageNotFoundError);


module.exports = routes;
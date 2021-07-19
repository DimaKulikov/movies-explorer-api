const Router = require('express').Router();

Router.use('/api/users', require('./users.routes'));
Router.use('/api/movies', require('./movies.routes'));

module.exports = Router;

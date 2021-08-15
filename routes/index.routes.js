const Router = require('express').Router();
const auth = require('../middlewares/auth');

Router.use('/api', require('./auth.routes'));

Router.use(auth);
Router.use('/api/users', require('./users.routes'));
Router.use('/api/movies', require('./movies.routes'));

module.exports = Router;

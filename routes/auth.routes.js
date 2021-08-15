const AuthRouter = require('express').Router();
const { signup, signin } = require('../controllesrs/auth.controllers');

AuthRouter.post('/signup', signup);
AuthRouter.post('/signin', signin);

module.exports = AuthRouter;

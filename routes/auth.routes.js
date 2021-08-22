const AuthRouter = require('express').Router();
const { signup, signin, validate } = require('../controllesrs/auth.controllers');

AuthRouter.post('/signup', validate('signup'), signup);
AuthRouter.post('/signin', validate('signin'), signin);

module.exports = AuthRouter;

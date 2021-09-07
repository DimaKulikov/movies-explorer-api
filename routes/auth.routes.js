const AuthRouter = require('express').Router();
const { signup, signin, validate } = require('../controllesrs/auth.controllers');
const checkValidationErrors = require('../middlewares/checkValidationErrors');

AuthRouter.post('/signup', validate('signup'), checkValidationErrors, signup);
AuthRouter.post('/signin', validate('signin'), checkValidationErrors, signin);

module.exports = AuthRouter;

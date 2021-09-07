const UserRouter = require('express').Router();
const { getUser, updateUser, validate } = require('../controllesrs/users.controllers');
const checkValidationErrors = require('../middlewares/checkValidationErrors');

UserRouter.get('/me', getUser);
UserRouter.patch('/me', validate('updateUser'), checkValidationErrors, updateUser);


module.exports = UserRouter;

const UserRouter = require('express').Router();
const { getUser, updateUser, validate } = require('../controllesrs/users.controllers');

UserRouter.get('/me', getUser);
UserRouter.patch('/me', validate('updateUser'), updateUser);


module.exports = UserRouter;

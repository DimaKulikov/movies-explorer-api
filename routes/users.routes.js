const UserRouter = require('express').Router();
const { getUser, updateUser } = require('../controllesrs/users.controllers');

UserRouter.get('/me', getUser);
UserRouter.patch('/me', updateUser);


module.exports = UserRouter;

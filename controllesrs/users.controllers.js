const { body } = require('express-validator');
const UserModel = require('../models/user.model');
const { isMongoDuplicateError } = require('../utils/utils');
const { ApiError } = require('../utils/utils');

exports.getUser = (req, res, next) => {
  const userID = req.user._id;
  UserModel.findOne({ _id: userID })
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const userID = req.user._id;
  UserModel.findOneAndUpdate({ _id: userID }, { email, name }, { new: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (isMongoDuplicateError(err)) {
        next(ApiError.Conflict('Пользователь с таким email уже существует'));
      }
      next(err);
    });
};

exports.validate = (method) => {
  switch (method) {
    case 'updateUser':
      return [
        body('email', 'некорректный email').exists().isEmail(),
        body('name', 'некорректное имя пользователя').exists().isString().isLength({ min: 3 }),
      ];
    default:
      return true;
  }
};

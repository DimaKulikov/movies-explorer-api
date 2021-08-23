const { body } = require('express-validator/check');
const UserModel = require('../models/user.model');

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
    .catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'updateUser': {
      return [
        body('email', 'некорректный email').exists().isEmail(),
        body('name', 'некорректное имя пользователя').exists().isString().isLength({ min: 3 }),
      ];
    }
    default:
      return true;
  }
};

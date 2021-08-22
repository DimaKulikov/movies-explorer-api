const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator/check');
const UserModel = require('../models/user.model');

exports.signup = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => UserModel.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send({ _id: user._id, name }))
    .catch(next);
};

exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  UserModel.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret');
      res.send({ token });
    })
    .catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'signup':
      return [
        body('email', 'некорректно заполненое поле email').exists().isEmail(),
        body('name', 'некорректно заполненое поле name').exists().isString(),
        body('password', 'некорректно заполненое поле password')
          .exists()
          .isString()
          .isStrongPassword()
          .withMessage('пароль должен быть не менее 8 символов, содержать минимум 1 строчную, 1 заглавную буквы, 1 символ и 1 цифру'),
      ];
    case 'signin':
      return [
        body('email', 'некорректно заполненое поле email').exists().isEmail(),
        body('password', 'некорректно заполненое поле password')
          .exists()
          .isString(),
      ];
    default:
      return true;
  }
};

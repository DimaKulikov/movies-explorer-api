const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
}

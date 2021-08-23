const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../utils/utils');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (input) => validator.isEmail(input),
      message: 'Email validation failed',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findByCredentials = function findByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(ApiError.Authtorization('Ошибка авторизации'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) throw ApiError.Authtorization('Ошибка авторизации');
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);

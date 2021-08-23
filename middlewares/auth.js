const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw ApiError.Authorization('Требуется авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret');
  } catch (error) {
    next(ApiError.Authentication('Ошибка аутентификации'));
  }
  req.user = payload;
  next();
};

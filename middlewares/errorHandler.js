const { Result } = require('express-validator');

module.exports = (err, req, res, next) => {
  // a middleware to catch all request errors, parse errors,
  // and send back responses with response codes other than

  // если у ошибки нет статуса, выставляем 500
  let { statusCode = 500, message } = err;

  // Проверяем что ошибка принадлежит express-validator
  if (err instanceof Result) {
    statusCode = 400;
    message = { errors: err.mapped() };
    // Object.values(err.mapped()).map((errWithoutDupes) => errWithoutDupes.msg).join(', ');
  }

  // отправляем ответ с ошибкой
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};

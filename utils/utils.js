const validator = require('validator');

exports.isMongoDuplicateError = (err) => {
  if (err.name === 'MongoError' && err.code === 11000) {
    return true;
  }
  return false;
};

exports.urlValidator = (input) => validator.isURL(input, { require_protocol: true });

exports.ApiError = class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static BadRequest(msg) {
    return new ApiError(msg, 400);
  }

  static Conflict(msg) {
    return new ApiError(msg, 409);
  }

  static Authentication(msg) {
    return new ApiError(msg, 401);
  }

  static Authorization(msg) {
    return new ApiError(msg, 403);
  }
};

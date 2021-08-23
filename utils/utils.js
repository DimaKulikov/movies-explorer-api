const validator = require('validator');

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

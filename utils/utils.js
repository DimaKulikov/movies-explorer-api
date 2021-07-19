const validator = require('validator');

const urlValidator = (input) => validator.isURL(input, { require_protocol: true });

module.exports = urlValidator;

const mongoose = require('mongoose');
const validator = require('validator');
const urlValidator = require('../utils/utils');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
    },
  },
  owner: {
    type: String,
    required: true,
    validate: validator.isMongoId,
  },
  movieID: {
    type: String,
    require: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

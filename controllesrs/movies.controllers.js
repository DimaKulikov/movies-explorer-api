const { body } = require('express-validator');
const MovieModel = require('../models/movie.model');

exports.getAllMovies = (req, res, next) => {
  MovieModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.saveMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId, owner,
  } = req.body;
  MovieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch(next);
};

exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.body;
  MovieModel.findByIdAndDelete(movieId)
    .orFail(new Error('not found'))
    .then((deletedMovie) => res.send(deletedMovie))
    .catch(next);
};

exports.validate = (method) => {
  switch (method) {
    case 'saveMovie':
      return [
        body('country', 'некорректно заполненное поле "country"').exists().isString(),
        body('director', 'некорректно заполненное поле "director"').exists().isString(),
        body('duration', 'некорректно заполненное поле "duration"').exists().isInt(),
        body('year', 'некорректно заполненное поле "year"').exists().isString(),
        body('description', 'некорректно заполненное поле "description"').exists().isString(),
        body('image', 'некорректно заполненное поле "image"').exists().isString().isURL(),
        body('trailer', 'некорректно заполненное поле "trailer"').exists().isString().isURL(),
        body('thumbnail', 'некорректно заполненное поле "thumbnail"').exists().isString().isURL(),
        body('owner', 'некорректно заполненное поле "owner"').exists().isMongoId(),
        body('movieId', 'некорректно заполненное поле "movieId"').exists().isString(),
        body('nameRU', 'некорректно заполненное поле "nameRU"').exists().isString(),
        body('nameEN', 'некорректно заполненное поле "nameEN"').exists().isString(),
      ];
    case 'deleteMovie':
      return [
        body('movieId', 'некорректный id фильма').exists().isMongoId(),
      ];
    default:
      return true;
  }
};

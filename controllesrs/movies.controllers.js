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
}

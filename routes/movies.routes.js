const MoviesRouter = require('express').Router();
const MovieModel = require('../models/movie.model');

MoviesRouter.get('/', (req, res, next) => {
  MovieModel.find({})
    .then((cards) => res.send(cards))
    .catch(next);
});

MoviesRouter.post('/', (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  MovieModel.create({ country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
  })
    .then((movie) => res.send(movie))
    .catch(next);
});

module.exports = MoviesRouter;

const MoviesRouter = require('express').Router();
const { saveMovie, getAllMovies, deleteMovie } = require('../controllesrs/movies.controllers');

MoviesRouter.get('/', getAllMovies);
MoviesRouter.post('/', saveMovie);
MoviesRouter.delete('/', deleteMovie);

module.exports = MoviesRouter;

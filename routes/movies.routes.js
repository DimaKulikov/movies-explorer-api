const MoviesRouter = require('express').Router();
const { saveMovie, getAllMovies, deleteMovie, validate } = require('../controllesrs/movies.controllers');

MoviesRouter.get('/', getAllMovies);
MoviesRouter.post('/', validate('saveMovie'), saveMovie);
MoviesRouter.delete('/', validate('deleteMovie'), deleteMovie);

module.exports = MoviesRouter;

const MoviesRouter = require('express').Router();
const {
  saveMovie, getAllMovies, deleteMovie, validate,
} = require('../controllesrs/movies.controllers');
const checkValidationErrors = require('../middlewares/checkValidationErrors');

MoviesRouter.get('/', getAllMovies);
MoviesRouter.post('/', validate('saveMovie'), checkValidationErrors, saveMovie);
MoviesRouter.delete('/', validate('deleteMovie'), checkValidationErrors, deleteMovie);

module.exports = MoviesRouter;

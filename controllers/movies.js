const Movie = require('../models/movie');

const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('../constants/statusCodeConstants');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');

const createMovie = (req, res, next) => {
  req.body.owner = req.user._id;
  Movie.create(req.body)
    .then((newMovie) => {
      res.status(HTTP_STATUS_CREATED).send(newMovie);
    })
    .catch((e) => {
      next(e);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch((e) => {
      next(e);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('The requested information was not found'));
        return;
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Access is restricted'));
        return;
      }
      Movie.findByIdAndDelete(movieId)
        .then(() => res.status(HTTP_STATUS_OK).send({ message: 'done' }))
        .catch((e) => {
          next(e);
        });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Incorrect data was transmitted'));
        return;
      }
      next(e);
    });
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};

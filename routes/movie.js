const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { URL_REGEX, NAME_EN, NAME_RU } = require('../constants/regex');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_REGEX),
    trailerLink: Joi.string().required().pattern(URL_REGEX),
    thumbnail: Joi.string().required().pattern(URL_REGEX),
    nameRU: Joi.string().required().pattern(NAME_RU),
    nameEN: Joi.string().required().pattern(NAME_EN),
  }).unknown(true),
}), createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;

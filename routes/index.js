const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('../middlewares/logger');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const userRoutes = require('./user');
const movieRoutes = require('./movie');
const NotFoundError = require('../errors/not-found-error');

router.use(requestLogger);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.delete('/signout', (req, res) => {
  res.status(202).clearCookie('jwt', { sameSite: 'none', secure: true }).send('cookie cleared');
});
router.use(auth);
router.use(userRoutes);
router.use(movieRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('This page not found'));
});
router.use(errorLogger);
router.use(errors());
router.use(errorHandler);
module.exports = router;

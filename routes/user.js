const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const users = require('../controllers/users');

const { getCurrentUser, updateUserInfo } = users;

router.get('/users/me', getCurrentUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

module.exports = router;

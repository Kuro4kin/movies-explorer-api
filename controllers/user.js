const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');
const NotFoundError = require('../errors/not-found-error');
const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('../constants/statusCodeConstants')

const createUser = (req, res, next) => {
  const {email, password, name} = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((newUser) => res.status(HTTP_STATUS_CREATED).send(newUser))
        .catch((e) => {
          if (e.code === 11000) {
            next(new ConflictError('User with this email has already been created'));
            return;
          }
          next(e);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Invalid user email address or password specified'));
        return;
      }
      const token = jwt.sign({ _id: user._id }, 'verysecretword', { expiresIn: '7d' });
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError('Invalid user email address or password specified'));
            return;
          }
          res
            .status(HTTP_STATUS_OK)
            .cookie('jwt', token, {
              maxAge: 3600000 * 7 * 24,
              httpOnly: true,
              sameSite: true,
            })
            .send({ message: 'Authorization completed' });
        })
        .catch((e) => next(e));
    })
    .catch((e) => next(e));
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user);
    })
    .catch((e) => next(e));
};

const updateUserInfo = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        next(new NotFoundError('The requested information was not found'));
        return;
      }
      res.status(HTTP_STATUS_OK).send(updateUser);
    })
    .catch((e) => next(e));
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUserInfo,
};

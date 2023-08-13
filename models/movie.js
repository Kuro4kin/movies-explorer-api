const mongoose = require('mongoose');
const { URL_REGEX } = require('../constants/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Invalid link',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Invalid link',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => URL_REGEX.test(url),
      message: 'Invalid link',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);

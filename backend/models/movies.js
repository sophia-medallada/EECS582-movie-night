// models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  releaseYear: {
    type: Number,
    required: true
  },
  director: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  watchedDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
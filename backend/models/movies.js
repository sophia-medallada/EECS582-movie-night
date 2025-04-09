// Author: Damian Mendez
// Date: 4/2/2025
//Last Modified: 4/9/2025
//Purpose: Models our movie schema to be used with other mongo api services

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
  },
  startTime: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Movie', movieSchema);
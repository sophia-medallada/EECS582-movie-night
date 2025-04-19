// Author: Damian Mendez
// Date: 4/19/2025
//Last Modified: 4/19/2025
//Purpose: Models our profile schema to be used with other mongo api services

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
},
favorites: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Movie'
}],
watchlist: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Movie'
}],
createdAt: {
  type: Date,
  default: Date.now
}
}, {
timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);
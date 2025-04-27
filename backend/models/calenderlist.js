// Author: Damian Mendez
// Date: 4/26/2025
//Last Modified: 4/26/2025
//Purpose: Models our entry lists for the calender displays

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
},
list: [{
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
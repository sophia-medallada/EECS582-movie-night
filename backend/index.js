// Author: Damian Mendez
// Date: 3/13/2025
//Last Modified: 4/2/2025
//Purpose: To create a database connection using MongodbAtlas

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config({path: "./config.env"})

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const movieRoutes = require('./routes/movies');
app.use('/api/movies', movieRoutes);

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Movie Night API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
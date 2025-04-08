// Authors: Damian
// Date: 2/25/25
// Last Modified: 3/2/25
// Purpose: To display scheduled movies and hold scheduler logic.

import React, { useState } from 'react';
import {
  Box, Typography, TextField, Button, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Stack
} from '@mui/material';

const TimeTable = ({ initialMovies = [], onMoviesChange, selectedDate }) => {

  const isToday = selectedDate.toDateString() === new Date().toDateString();
  const startHour = isToday ? new Date().getHours() : 0;
  const hours = Array.from({ length: Math.ceil((24 - startHour) / 3) }, (_, i) => (startHour + i * 3) % 24);


  // Sample initial movie data
  // Also holds all existing movies
  const [movies, setMovies] = useState(initialMovies);
  
  // State used in new movie creations
  const [newMovie, setNewMovie] = useState({
    title: '',
    startTime: '',
    duration: '',
    color: '#e74c3c'
  });

  // Hours to display: rolling 24 hour AM/PM schedule, starts at current time with ticks every 3 hours 
  const now = new Date();
  const currentHour = now.getHours();
  
  const formatHour = (hour) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour} ${period}`;
  };
  
  
  // Convert time string (HH:MM) to minutes since start of day
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };
  
  // Convert minutes to percentage for positioning
  const minutesToPercentage = (minutes) => {
    const dayStart = timeToMinutes('08:00'); // 8 AM
    const dayEnd = timeToMinutes('22:00');   // 10 PM
    const dayLength = dayEnd - dayStart;
    
    return ((minutes - dayStart) / dayLength) * 100;
  };
  
  // Convert minutes to a readable time format
  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };
  
  // Add a new movie
  const handleAddMovie = () => {
    //Ensures all fields are filled
    if (!newMovie.title || !newMovie.startTime || !newMovie.duration) {
      alert('Please fill all fields');
      return;
    }
    
    // Uses state to append new movie to movies list
    setMovies([...movies, {
      id: Date.now(),
      title: newMovie.title,
      startTime: newMovie.startTime,
      duration: parseInt(newMovie.duration),
      color: newMovie.color
    }]);
    
    //Uses sstate to create a new movie
    setNewMovie({
      title: '',
      startTime: '',
      duration: '',
      color: '#' + Math.floor(Math.random()*16777215).toString(16) // Random color
    });
  };
  
  // Remove a movie
  const handleRemoveMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };
  
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Movie Schedule Planner
      </Typography>

      {/* Add Movie Form */}
      <Box component={Paper} sx={{ p: 3, mb: 5 }}>
        <Typography variant="h6" gutterBottom>
          Add New Movie
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Movie Title"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              inputProps={{ min: "08:00", max: "20:00" }}
              value={newMovie.startTime}
              onChange={(e) => setNewMovie({ ...newMovie, startTime: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Duration (min)"
              type="number"
              value={newMovie.duration}
              inputProps={{ min: 30, max: 300 }}
              onChange={(e) => setNewMovie({ ...newMovie, duration: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Color"
              type="color"
              value={newMovie.color}
              onChange={(e) => setNewMovie({ ...newMovie, color: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button fullWidth variant="contained" onClick={handleAddMovie} sx={{ height: '100%' }}>
              Add Movie
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Timeline */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Hour by Hour Schedule
        </Typography>
        <Box
          sx={{
            position: 'relative',
            border: '1px solid',
            borderColor: 'divider',
            height: 120,
            overflow: 'hidden',
            mb: 4,
          }}
        >
          {/* Hour Markers */}
          <Stack direction="row" sx={{ height: '100%' }}>
            {hours.map((hour) => (
              <Box
                key={hour}
                sx={{
                  width: `${100 / hours.length}%`,
                  borderRight: '1px solid #ccc',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  pt: 1,
                  fontSize: '0.875rem',
                }}
              >
                {formatHour(hour)}
              </Box>
            ))}
          </Stack>

          {/* Movie Blocks */}
          {movies.map((movie) => {
            const startMinutes = timeToMinutes(movie.startTime);
            const endMinutes = startMinutes + movie.duration;
            const left = minutesToPercentage(startMinutes);
            const width = (movie.duration / (14 * 60)) * 100;

            return (
              <Box
                key={movie.id}
                sx={{
                  position: 'absolute',
                  top: 50,
                  left: `${left}%`,
                  width: `${width}%`,
                  height: 60,
                  bgcolor: movie.color,
                  color: '#fff',
                  p: 1,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                }}
              >
                <div><strong>{movie.title}</strong></div>
                <div>{movie.startTime} – {minutesToTime(endMinutes)}</div>
                <div>{movie.duration} min</div>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Movie List */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Scheduled Movies
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Movie</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => {
                const startMinutes = timeToMinutes(movie.startTime);
                const endMinutes = startMinutes + movie.duration;
                return (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            backgroundColor: movie.color,
                          }}
                        />
                        {movie.title}
                      </Stack>
                    </TableCell>
                    <TableCell>{movie.startTime}</TableCell>
                    <TableCell>{minutesToTime(endMinutes)}</TableCell>
                    <TableCell>{movie.duration} min</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        onClick={() => handleRemoveMovie(movie.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TimeTable;
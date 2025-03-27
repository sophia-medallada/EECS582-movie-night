// Authors: Damian
// Date: 2/25/25
// Last Modified: 3/2/25
// Purpose: To display scheduled movies and hold scheduler logic.

import React, { useState } from 'react';
import '../styles/TimeTable.css';

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

  // Hours to display -- rolling 24 hour AM/PM schedule, starts at current time with ticks every 3 hours 
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
    <div className="movie-scheduler">
      <h1 className="header">Movie Schedule Planner</h1>
      
      {/* Add new movie form */}
      <div className="form-container">
        <h2 className="form-title">Add New Movie</h2>
        <div className="form-grid">
          <div className="form-group">
             {/* Movie Title Form */}
            <label className="label">Movie Title</label>
            <input
              type="text"
              className="input"
              value={newMovie.title}
              onChange={(e) => setNewMovie({...newMovie, title: e.target.value})}
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            {/* Start time form */}
            <label className="label">Start Time</label>
            <input
              type="time"
              className="input"
              value={newMovie.startTime}
              onChange={(e) => setNewMovie({...newMovie, startTime: e.target.value})}
              min="08:00"
              max="20:00"
            />
          </div>
          <div className="form-group">
            {/* duration form */}
            <label className="label">Duration (min)</label>
            <input
              type="number"
              className="input"
              value={newMovie.duration}
              onChange={(e) => setNewMovie({...newMovie, duration: e.target.value})}
              placeholder="Duration"
              min="30"
              max="300"
            />
          </div>
          <div className="form-group">
            {/* color form */}
            {/* Color is the display color on the scheduler */}
            <label className="label">Color</label>
            <input
              type="color"
              className="input color-input"
              value={newMovie.color}
              onChange={(e) => setNewMovie({...newMovie, color: e.target.value})}
            />
          </div>
          <div className="form-group">
            {/* Button that adds the movie */}
            <label className="label">&nbsp;</label>
            <button
              className="button"
              onClick={handleAddMovie}
            >
              Add Movie
            </button>
          </div>
        </div>
      </div>
      
      {/* Timeline view */}
      <div className="timeline-container">
        <h2 className="timeline-title">Hour by Hour Schedule</h2>
        <div className="timeline">
          {/* Hour markers */}
          <div className="hour-markers-container">
            {hours.map(hour => (
              <div key={hour} className="hour-marker">
                <div className="hour-label">
                  {formatHour(hour)}
                </div>
              </div>
            ))}
          </div>

          
          {/* Movie blocks */}
          {movies.map(movie => { {/* Mapping goes through this code for each movie in the array */}
            const startMinutes = timeToMinutes(movie.startTime); {/* Gives us start time */}
            const endMinutes = startMinutes + movie.duration; {/* Figures out end time */}
            const startPercent = minutesToPercentage(startMinutes); {/* Shows us how much of the timeline to block off */}
            const durationPercent = (movie.duration / (14 * 60)) * 100; // 14 hours displayed
            
            return (
              <div
                key={movie.id}
                className="movie-block"
                style={{
                  left: `${startPercent}%`,
                  width: `${durationPercent}%`,
                  backgroundColor: movie.color,
                }}
                title={`${movie.title} (${movie.startTime} - ${minutesToTime(endMinutes)})`}
              >
                <div className="movie-title">{movie.title}</div>
                <div className="movie-time">
                  {movie.startTime} - {minutesToTime(endMinutes)}
                </div>
                <div className="movie-duration">{movie.duration} min</div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Movie list */}
      <div className="list-container">
        <h2 className="list-title">Scheduled Movies</h2>
        <table className="movie-table">
          <thead className="table-head">
            <tr>
              <th className="table-head-cell">Movie</th>
              <th className="table-head-cell">Start Time</th>
              <th className="table-head-cell">End Time</th>
              <th className="table-head-cell">Duration</th>
              <th className="table-head-cell">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {movies.map(movie => {
              const startMinutes = timeToMinutes(movie.startTime);
              const endMinutes = startMinutes + movie.duration;
              
              return (
                <tr key={movie.id} className="table-row">
                  <td className="table-cell">
                    <div className="movie-info">
                      <span 
                        className="color-dot"
                        style={{ backgroundColor: movie.color }}
                      ></span>
                      <span>{movie.title}</span>
                    </div>
                  </td>
                  <td className="table-cell">{movie.startTime}</td>
                  <td className="table-cell">{minutesToTime(endMinutes)}</td>
                  <td className="table-cell">{movie.duration} minutes</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleRemoveMovie(movie.id)}
                      className="remove-button"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTable;
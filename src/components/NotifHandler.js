//Authors: Eli Gabriel
//Date: 3/30/25
//Last Modified: 4/27/25
//Purpose: Manages the functionality of the notifications

import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimeTable from './TimeTable';

const NotifHandler = () => {
  // State to store the scheduled time for manual notifications
  const [scheduledTime, setScheduledTime] = useState('');
  const [message, setMessage] = useState('Your Movie Starts Now!');
  
  // State to store movie schedules
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Function to handle changes in the movie list from TimeTable
  const handleMoviesChange = (updatedMovies) => {
    setMovies(updatedMovies);
    
    // Schedule notifications for all movies
    scheduleMovieNotifications(updatedMovies);
  };
  
  // Function to schedule notifications for all movies
  const scheduleMovieNotifications = (movieList) => {
    const now = new Date();
    
    movieList.forEach(movie => {
      // Parse the time string (HH:MM)
      const [hours, minutes] = movie.startTime.split(':');
      const targetTime = new Date();
      targetTime.setHours(parseInt(hours, 10));
      targetTime.setMinutes(parseInt(minutes, 10));
      targetTime.setSeconds(0);
      
      // Create a time 10 minutes before the movie starts
      const reminderTime = new Date(targetTime);
      reminderTime.setMinutes(reminderTime.getMinutes() - 10);
      
      // If the reminder time is in the future
      if (reminderTime > now) {
        // Calculate milliseconds until the reminder time
        const timeUntilNotification = reminderTime.getTime() - now.getTime();
        
        // Schedule the notification
        setTimeout(() => {
          toast.info(`${movie.title} starts in 10 minutes!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }, timeUntilNotification);
        
        // Log that we've scheduled a notification (for debugging)
        console.log(`Notification scheduled for ${movie.title} at ${reminderTime.toLocaleTimeString()}`);
      }
    });
  };
  
  // Effect to run when component mounts - schedule notifications for any initial movies
  useEffect(() => {
    if (movies.length > 0) {
      scheduleMovieNotifications(movies);
    }
  }, []);
  
  // Function to schedule a manual notification
  const scheduleManualNotification = () => {
    if (!scheduledTime) return;
    
    const now = new Date();
    const targetTime = new Date();
    
    // Parse the time string (HH:MM)
    const [hours, minutes] = scheduledTime.split(':');
    targetTime.setHours(parseInt(hours, 10));
    targetTime.setMinutes(parseInt(minutes, 10));
    targetTime.setSeconds(0);
    
    // If the target time is in the past for today, show warning
    if (targetTime <= now) {
      toast.warning('Please select a future time!');
      return;
    }
    
    // Calculate milliseconds until the target time
    const timeUntilNotification = targetTime.getTime() - now.getTime();
    
    // Schedule the notification
    toast.info(`Notification scheduled for ${scheduledTime}`);
    
    setTimeout(() => {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, timeUntilNotification);
  };
  
  return (
    <Box>
      {/* TimeTable Component */}
      <TimeTable 
        initialMovies={movies} 
        onMoviesChange={handleMoviesChange}
        selectedDate={selectedDate}
      />
      
      {/* Manual Notification UI */}
      <Box component={Paper} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Schedule Manual Notification
        </Typography>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Notification Time"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <Button 
              variant="contained"
              fullWidth
              onClick={scheduleManualNotification}
              sx={{ height: '100%' }}
            >
              Schedule
            </Button>
          </Grid>
        </Grid>
      </Box>
      
      {/* Information about automatic notifications */}
      <Box sx={{ mt: 2, p: 2 }}>
        <Typography variant="body1" color="text.secondary">
          Automatic notifications will be sent 10 minutes before each scheduled movie.
        </Typography>
      </Box>
      
      {/* Toast Container - this is where notifications will appear */}
      <ToastContainer />
    </Box>
  );
};

export default NotifHandler;

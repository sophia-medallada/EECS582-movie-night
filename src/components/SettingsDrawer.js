//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 4/20/25
//Last Modified: 4/27/25
//Purpose: Settings that allows the user to change their Username, Email, or Password
// src/components/SettingsDrawer.js

import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider,
  Button, TextField, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {fetchProfiles, updateProfile, fetchProfileByEmail} from "../services/MongoService";
import bcrypt from 'bcryptjs';

const SettingsDrawer = ({ open, onClose }) => {
  // State for first text field
  const [showTextField1, setShowTextField1] = useState(false);
  const [newUser, setNewUser] = useState('');
  
  // State for second text field
  const [showTextField2, setShowTextField2] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [err, setErr] = useState({});
  
  // State for third text field
  const [showTextField3, setShowTextField3] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  
  // State for updates and alerts
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Get the current user from localStorage
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setCurrentUser(JSON.parse(userToken));
    }
  }, []);

  // Toggle handlers
  const handleToggle1 = () => setShowTextField1(prev => !prev);
  const handleToggle2 = () => {
    setShowTextField2(prev => !prev);
    // Reset password validation state when toggling
    if (!showTextField2) {
      setNewPass('');
      setErr({});
      setIsValid(false);
    }
  };
  const handleToggle3 = () => setShowTextField3(prev => !prev);

  // Text change handlers
  const handleUserChange = (event) => setNewUser(event.target.value);
  
  // Password validation similar to UserAuth.js
  const checkPassword = (pass) => {
    const err = {};
    if (pass.length < 10) {err.length = "Minimum of 10 characters";}
    if (/([a-z])/g.test(pass) === false) {err.lowerC = "Minimum of 1 lowercase character";}
    if (/([A-Z])/g.test(pass) === false) {err.upperC = "Minimum of 1 uppercase character";}
    if (/([0-9])/g.test(pass) === false) {err.nums = "Minimum of 1 number";}
    if (/([!#$%&-])/g.test(pass) === false) {err.specialC = "Minimum of 1 speical character (!, #, $, %, &)";}
    return err;
  };
  
  const handlePassChange = (event) => {
    const pass = event.target.value;
    setNewPass(pass);
    const passErrors = checkPassword(pass);
    setErr(passErrors);
    setIsValid(Object.keys(passErrors).length === 0);
  };
  
  const handleEmailChange = (event) => setNewEmail(event.target.value);

  // Submit handlers
  const handleUsernameSubmit = async () => {
    if (!currentUser || !newUser.trim()) return;
    
    try {
      const updatedUser = {
        ...currentUser,
        username: newUser
      };
      
      const result = await updateProfile(currentUser._id, updatedUser);
      
      if (result) {
        // Update localStorage with new user data
        localStorage.setItem('userToken', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setUpdateMessage('Username updated successfully!');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateMessage('');
          setShowTextField1(false);
          setNewUser('');
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating username:", error);
      setUpdateMessage('Failed to update username. Please try again.');
      setUpdateSuccess(false);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!currentUser || !isValid) return;
    
    try {
      const passHash = bcrypt.hashSync(newPass, bcrypt.genSaltSync(10));
      const updatedUser = {
        ...currentUser,
        password: passHash
      };
      
      const result = await updateProfile(currentUser._id, updatedUser);
      
      if (result) {
        // Update localStorage with new user data
        localStorage.setItem('userToken', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setUpdateMessage('Password updated successfully!');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateMessage('');
          setShowTextField2(false);
          setNewPass('');
          setIsValid(false);
          setErr({});
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setUpdateMessage('Failed to update password. Please try again.');
      setUpdateSuccess(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!currentUser || !newEmail.trim()) return;
    
    try {
      // Check if email already exists
      const profiles = await fetchProfiles();
      const emailExists = profiles.find(profile => 
        profile.email === newEmail && profile._id !== currentUser._id
      );
      
      if (emailExists) {
        setUpdateMessage('Email already in use by another account.');
        setUpdateSuccess(false);
        return;
      }
      
      const updatedUser = {
        ...currentUser,
        email: newEmail
      };
      
      const result = await updateProfile(currentUser._id, updatedUser);
      
      if (result) {
        // Update localStorage with new user data
        localStorage.setItem('userToken', JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        setUpdateMessage('Email updated successfully!');
        setUpdateSuccess(true);
        setTimeout(() => {
          setUpdateMessage('');
          setShowTextField3(false);
          setNewEmail('');
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating email:", error);
      setUpdateMessage('Failed to update email. Please try again.');
      setUpdateSuccess(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 300 } // Width of drawer
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
        <Typography variant="h6">Settings</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Configure your settings below
        </Typography>
        
        {updateMessage && (
          <Alert severity={updateSuccess ? "success" : "error"} sx={{ my: 2 }}>
            {updateMessage}
          </Alert>
        )}
        
        {/* First Toggle Button and Text Field that will change the username*/}
        <Box my={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleToggle1}
            fullWidth
          >
            {showTextField1 ? "Cancel" : "Change Username"}
          </Button>
          
          {showTextField1 && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Enter new username"
                variant="outlined"
                size="small"
                value={newUser}
                onChange={handleUserChange}
                sx={{ mb: 1 }}
              />
              <Button 
                variant="contained" 
                onClick={handleUsernameSubmit}
                disabled={!newUser.trim()}
              >
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Second Toggle Button and Text Field that will change the password*/}
        <Box my={2}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleToggle2}
            fullWidth
          >
            {showTextField2 ? "Cancel" : "Change Password"}
          </Button>
          
          {showTextField2 && (
            <Box mt={2}>
              <TextField
                fullWidth
                type="password"
                label="Enter new password"
                variant="outlined"
                size="small"
                value={newPass}
                onChange={handlePassChange}
                sx={{ mb: 1 }}
              />
              {!isValid && Object.values(err).map((error, index) => (
                <Typography key={index} variant="caption" color="error" display="block">
                  {error}
                </Typography>
              ))}
              {isValid && newPass && (
                <Typography variant="caption" color="primary" display="block">
                  Password is valid
                </Typography>
              )}
              <Button 
                variant="contained" 
                onClick={handlePasswordSubmit}
                disabled={!isValid}
                sx={{ mt: 1 }}
              >
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Third Toggle Button and Text Field that will change the email*/}
        <Box my={2}>
          <Button 
            variant="outlined" 
            color="info" 
            onClick={handleToggle3}
            fullWidth
          >
            {showTextField3 ? "Cancel" : "Change Email"}
          </Button>
          
          {showTextField3 && (
            <Box mt={2}>
              <TextField
                fullWidth
                type="email"
                label="Enter new email"
                variant="outlined"
                size="small"
                value={newEmail}
                onChange={handleEmailChange}
                sx={{ mb: 1 }}
              />
              <Button 
                variant="contained" 
                onClick={handleEmailSubmit}
                disabled={!newEmail.trim() || !newEmail.includes('@')}
              >
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Updates will be saved when you click Confirm
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;

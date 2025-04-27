//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 4/20/25
//Last Modified: 4/26/25
//Purpose: Settings that allows the user to change their Username, Email, or Password
// src/components/SettingsDrawer.js

import React, { useState } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider,
  Button, TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SettingsDrawer = ({ open, onClose }) => {
  // State for first text field
  const [showTextField1, setShowTextField1] = useState(false);
  const [newUser, setNewUser] = useState('');
  
  // State for second text field
  const [showTextField2, setShowTextField2] = useState(false);
  const [newPass, setNewPass] = useState('');
  
  // State for third text field
  const [showTextField3, setShowTextField3] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  // Toggle handlers
  const handleToggle1 = () => setShowTextField1(prev => !prev);
  const handleToggle2 = () => setShowTextField2(prev => !prev);
  const handleToggle3 = () => setShowTextField3(prev => !prev);

  // Text change handlers
  const handleUserChange = (event) => setNewUser(event.target.value);    // 1 = Username
  const handlePassChange = (event) => setNewPass(event.target.value);    // 2 = Password
  const handleEmailChange = (event) => setNewEmail(event.target.value);  // 3 = Email

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
        
        {/* First Toggle Button and Text Field */}
        <Box my={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleToggle1}
            fullWidth
          >
            {showTextField1 ? "Change Username" : "Change Username"}
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
              />
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Second Toggle Button and Text Field */}
        <Box my={2}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleToggle2}
            fullWidth
          >
            {showTextField2 ? "Change Password" : "Change Password"}
          </Button>
          
          {showTextField2 && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Enter new password"
                variant="outlined"
                size="small"
                value={newPass}
                onChange={handlePassChange}
              />
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Third Toggle Button and Text Field */}
        <Box my={2}>
          <Button 
            variant="outlined" 
            color="info" 
            onClick={handleToggle3}
            fullWidth
          >
            {showTextField3 ? "Change Email" : "Change Email"}
          </Button>
          
          {showTextField3 && (
            <Box mt={2}>
              <TextField
                fullWidth
                label="Enter new email"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                value={newEmail}
                onChange={handleEmailChange}
              />
              <Button type="submit" variant="contained">
                Confirm
              </Button>
            </Box>
          )}
        </Box>
        
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Settings are automatically saved
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;

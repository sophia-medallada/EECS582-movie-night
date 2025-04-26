//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 4/10/2025
//Last Modified: 4/25/25
//Purpose: Gives the user a page of settings

// src/components/SettingsDrawer.js

import React, { useState } from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider,
  Button, TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SettingsDrawer = ({ open, onClose }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [textValue, setTextValue] = useState('');

  const handleToggle = () => {
    setShowTextField(prevState => !prevState);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
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
        
        {/* Toggle Button for Text Field */}
        <Box my={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleToggle}
            fullWidth
          >
            {showTextField ? "Change Username" : "Change Username"}
          </Button>
        </Box>
        
        {/* Conditionally Rendered Text Field */}
        {showTextField && (
          <Box my={2}>
            <TextField
              fullWidth
              label="Enter New Username"
              variant="outlined"
              size="small"
              value={textValue}
              onChange={handleTextChange}
            />
          </Box>
        )}
        
        {/* Additional Settings Can Go Here */}
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Additional settings can be added here
        </Typography>
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;

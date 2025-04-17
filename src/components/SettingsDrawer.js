// src/components/SettingsDrawer.js

import React from 'react';
import {
  Drawer, Box, Typography, IconButton, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SettingsDrawer = ({ open, onClose }) => {
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
        <Typography variant="body2" color="text.secondary">
          settings placeholder
           add config in SettingsDrawer.js
        </Typography>
        {/* placeholder */}
      </Box>
    </Drawer>
  );
};

export default SettingsDrawer;

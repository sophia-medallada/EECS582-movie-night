//Authors: Abraham
//Date: 3/30/25
//Last Modified: 4/1/25
//Purpose: Adds functionality for users logging out.

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';


const UserAuthLogout = () => {
  const [userToken, setToken] = useState(() =>{
    const loggedUser = localStorage.getItem('userToken');
    return loggedUser ? JSON.parse(loggedUser) : null;  
  });

  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);


  const handleLogOut = (e) => {
    setToken(null);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Are you sure you want to log out?</Typography>
      <form onsubmit={handleLogOut} id="logOutForm">
        <div id="LogOutBut">
          <button type="submit">Log Out</button>
        </div>
      </form>
    </Box>
  );
}

export default UserAuthLogout;
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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

  const handleLogin = async (userInfo) => {
    const info = {
      email : email,
      pass : pass
    };
    setToken({...userToken, [userInfo.target.value]: userInfo.target.value});
    //TODO check database and see if account information is correct.
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onsubmit={handleLogin} id="logForm">
          <label for="email" >Enter Email </label>
          <input type="email" id="email" value={email} onChange={(userInfo) => (setEmail(userInfo.target.value))} required></input>
          <br></br>
        
          <label for="pass">Enter Password </label>
          <input type="password" id="pass" value={pass} onChange={(userInfo) => (setPass(userInfo.target.value))}required></input>
          <br></br>
          <div id="LogInBut">
            <button type="submit">Log In</button>
          </div>
        </form>
    </Box>
  );
};

export default LoginPage;

//Authors: Abraham
//Date: 3/30/25
//Last Modified: 4/18/25
//Purpose: Adds functionality for user authentication.

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';



const UserAuth = () => {

  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  //Makes sure the user is logged in after signing up
  const [userToken, setToken] = useState(() =>{
    const loggedUser = localStorage.getItem('userToken');
    return loggedUser ? JSON.parse(loggedUser) : null;

  });
  const [isValid, setIsValid] = useState(false);
  const [err, setErr] = useState({});

  //Logs the user in after signing up
  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);


  //Checks if the password meets all of the conditions listed below.
  const checkPassword = (pass) => {
    const err = {};
    if (pass.length < 10) {err.length = "Minimum of 10 characters";}
    if (/([a-z])/g.test(pass) === false) {err.lowerC = "Minimum of 1 lowercase character";}
    if (/([A-Z])/g.test(pass) === false) {err.upperC = "Minimum of 1 uppercase character";}
    if (/([0-9])/g.test(pass) === false) {err.nums = "Minimum of 1 number";}
    if (/([!#$%&])/g.test(pass) === false) {err.specialC = "Minimum of 1 speical character (!, #, $, %, &)";}
    return err;
  }

  const handleEmail = (emails) => {
    const email = emails.target.value;
    //TODO: Check if Email exists in the database.
    //TODO: Add email to database if email is not there.
  };

  const handlePass = (password) => {
    const pass = password.target.value;
    setPass(pass);
    setErr(checkPassword(pass));
    setIsValid(Object.keys(checkPassword(pass)).length === 0);
    //TODO: Hash and Salt Password and send that to the database.
  };

  const handleUsername = (user) => {
    const username = user.target.value;
    //TODO: Add feature to check if username already exists in the database
  };

  const handleSignUp = async (userInfo) => {
    const info = {
      user : username,
      email : email,
      pass : pass
    };
    setToken({...userToken, [userInfo.target.value]: userInfo.target.value});
  }

  return(
    <div id="UserAuthPage">
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onsubmit={handleSignUp} id="SignForm">
          <label for="email" >Enter Email </label>
          <input type="email" id="email" value={email} onChange={(userInfo) => (setEmail(userInfo.target.value))} required></input>
          <br></br>
        
          <label for="user">Enter Username </label>
          <input type="username" id="user" value={username} onChange={(userInfo) => (setUser(userInfo.target.value))} required></input>
          <br></br>
        
          <label for="pass">Enter Password </label>
          <input type="password" id="pass" value={pass} onInput={handlePass} required></input>
          {/*Checks if the conditions of the password (shown in function checkPassword) are met */}
          {!isValid && Object.values(err).map((error, index) => (
              <p key={index} style={{color:'red'}}>{error}</p>
          ))}
          {isValid && pass && <p style={{color:'blue'}}>Password is valid</p>}
          <br></br>
          <div id="SignUpBut">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        
        <br></br>
      </Box>
    </div>
    
  );
}

export default UserAuth;
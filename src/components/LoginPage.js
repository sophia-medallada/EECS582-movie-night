//Authors: Abraham, Matthew
//Date: 4/17/25
//Last Modified: 4/27/25
//Purpose: Adds functionality for users to login. Checks the database to see if account exists.
//          bcryptjs is used to check if password hashes match.


import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import bcrypt from 'bcryptjs';
import {fetchProfiles, fetchProfileByEmail} from "../services/MongoService";


const LoginPage = () => {
  //key information about email, password, and user token.
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [userToken, setToken] = useState(() =>{
    const loggedUser = localStorage.getItem('userToken');
    return loggedUser ? JSON.parse(loggedUser) : null;
  });
  const [err, setErr] = useState({});
  
  useEffect(() => {
    if (userToken) {
      localStorage.setItem('userToken', JSON.stringify(userToken));
    } else {
      localStorage.removeItem('userToken');
    }
  }, [userToken]);



  //updates email as the user types.
  const handleEmail = async (e) => {
      e.preventDefault();
      const emails = e.target.value;
      setEmail(emails);
    };

  //Updates password as user types.
  const handlePassword = async (e) => {
    setPass(e.target.value);
  }

  //handles user login as they submit their information.
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await fetchProfiles();
      const tmp = user.find(i => i.email === email.toLowerCase());
      setToken(tmp);
      //checks if account exists.
      if (tmp) {
        const passMatch = bcrypt.compareSync(pass, tmp.password);
        //checks the password hashs to see if passwords match or not.
        if (passMatch === false) {
          setErr({login: "Wrong password!"});
          return;
        }
        //logs the user in.
        setErr({});
        setToken({tmp});
        alert("You are logged in!")
        window.location.reload();
      }
      //Gives an error if account does not exist.
      else {
        setErr({login: "Email not found."});
        return;
      }

    } catch (error) {
      console.error("Issues with logging user ", error);
    }
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={handleLogin} id="logForm">
          <label for="email" >Enter Email </label>
          <input type="email" id="email" value={email} onChange={handleEmail} required></input>
          <br></br>
        
          <label for="pass">Enter Password </label>
          <input type="password" id="pass" value={pass} onChange={handlePassword} required></input>
          {err.login && <p style={{color:"red"}}>{err.login}</p>}
          <br></br>
          <div id="LogInBut">
            <button type="submit">Log In</button>
          </div>
        </form>
    </Box>
  );
};

export default LoginPage;

//Authors: Abraham
//Date: 3/30/25
//Last Modified: 4/27/25
//Purpose: Adds functionality for user authentication. Password hashing done through bcryptjs

import React, { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { Alert, Box, Typography } from '@mui/material';
import {fetchProfiles, createProfile, fetchProfileByEmail} from "../services/MongoService";


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
    if (/([!#$%&-])/g.test(pass) === false) {err.specialC = "Minimum of 1 speical character (!, #, $, %, &)";}
    return err;
  };

  const handleEmail = async (e) => {
    e.preventDefault();
    const emails = e.target.value.toString();
    setEmail(emails);
  };

  const handlePass = (e) => {
    const pas = e.target.value;
    setPass(pas);
    setErr(checkPassword(pas));
    setIsValid(Object.keys(checkPassword(pas)).length === 0);    
  };

  const handleUsername = (e) => {
    const userVal = e.target.value;
    setUser(userVal);
  };

  const handleSignUp = async (e) => {
    
    e.preventDefault();
    if (Object.keys(err).length === 0 && isValid) {
      const passHash = bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
      const info = {
        email: email,
        username: username, 
        password: passHash
      };
      try {
        const user = await fetchProfiles();
        const result = user.find(i => i.email === email);        
        if (result != null) {  
          const err = {};
          err.emailExists = "Email already exists.";
          setErr(err.emailExists);
          alert("Email already exists!");
          console.log("Email exists already! ", result.email);
          window.location.reload();
          return;
        } else {
          setErr(prev => {
            const {emailExists, ...rest} = prev;
            return rest;
          });
        }


        //adds profile to the database
        const databaseResult = await createProfile(info);
        console.log("User created:", databaseResult);
        setToken(databaseResult);
        alert("Account Created!");
        window.location.reload();
      } catch (error) {
        console.error("Issues with creating user ", error);
      }
    }
  };

  return(
    <div id="UserAuthPage">
      <Box p={4}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSignUp} id="SignForm">
          <label for="email" >Enter Email </label>
          <input type="email" id="email" value={email} onChange={handleEmail}   required></input>
          <br></br>
        
          <label for="user">Enter Username </label>
          <input type="text" id="user" value={username} onChange={handleUsername}  required></input>
          <br></br>
        
          <label for="pass">Enter Password </label>
          <input type="password" id="pass" value={pass} onChange={handlePass} required></input>
          {/*Checks if the conditions of the password (shown in function checkPassword) are met. */}
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
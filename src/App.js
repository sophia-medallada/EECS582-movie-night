// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 4/7/25
// Purpose: Combines all the seperate application portions and bundles them together into a final render

//import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Button, Box } from '@mui/material';
import ThemeToggleButton from './ThemeToggle';

import SearchMovies from "./components/SearchMovies";
import SchedulePage from "./components/SchedulePage";
import SnackList from "./components/RecSnacks";


import './styles/App.css';


function App() {
  return (
    <Router>
      <Container>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button color="inherit" component={Link} to="/search">
              Movie Search
            </Button>
            <Button color="inherit" component={Link} to="/schedule">
              Schedule
            </Button>
            <Box flexGrow={1} />
            <ThemeToggleButton />
          </Toolbar>
        </AppBar>

        <Box mt={4}>
          <Routes>
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </Box>
        <SnackList/>
      </Container>
    </Router>
  );
}

export default App;


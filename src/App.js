// Authors: Sophia, Eli, Damian, Matthew, and Abraham
//Date: 2/13/25
//Last Modified: 4/27/25
//Purpose: Main application file

//React imports
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//Material UI components
import {
  Container, AppBar, Toolbar, Button, Box
} from '@mui/material';

//custom components
import ThemeToggleButton from './ThemeToggle';
import SearchMovies from "./components/SearchMovies";
import SchedulePage from "./components/SchedulePage";
import SnackList from "./components/RecSnacks";
import UserAuth from './components/UserAuth';
import LoginPage from "./components/LoginPage";
import UserAuthLogout from './components/UserAuthLogout';
import SettingsDrawer from "./components/SettingsDrawer";
import ActorDetails from "./components/ActorDetails";
//custom styles
import './styles/App.css';

//main function for the app 
function App() {
  //control the settings open/close
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Router>
      <Container>
        {/* Top navigation bar */}
        <AppBar position="static" color="primary">
          <Toolbar>
            {/* Navigation buttons */}
            <Button color="inherit" component={Link} to="/search">
              Movie Search
            </Button>
            <Button color="inherit" component={Link} to="/schedule">
              Schedule
            </Button>
            <Button color="inherit" component={Link} to="/userauth">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Log Out
            </Button>
            {/* Button to open settings drawer */}
            <Button color="inherit" onClick={() => setSettingsOpen(true)}>
              Settings
            </Button>
            {/* Spacer to push ThemeToggleButton to the right */}
            <Box flexGrow={1} />
            {/* Dark/Light theme toggle button */}
            <ThemeToggleButton />
          </Toolbar>
        </AppBar>
        {/* Main content area for page routes */}
        <Box mt={4}>
          <Routes>
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/actor/:id" element={<ActorDetails />} />
            <Route path="/userauth" element={<UserAuth />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<UserAuthLogout />} />
          </Routes>
        </Box>

        <SnackList />{/* Recommended Snacks list */}
        <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />{/* Settings section */}
        </Container>
    </Router>
  );
}

export default App;


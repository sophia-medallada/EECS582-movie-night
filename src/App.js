import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Container, AppBar, Toolbar, Button, Box
} from '@mui/material';

import ThemeToggleButton from './ThemeToggle';
import SearchMovies from "./components/SearchMovies";
import SchedulePage from "./components/SchedulePage";
import SnackList from "./components/RecSnacks";
import UserAuth from './components/UserAuth';
import LoginPage from "./components/LoginPage";
import UserAuthLogout from './components/UserAuthLogout';
import SettingsDrawer from "./components/SettingsDrawer";

import './styles/App.css';

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

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
            <Button color="inherit" component={Link} to="/userauth">
              Sign Up
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/logout">
              Log Out
            </Button>
            
            <Button color="inherit" onClick={() => setSettingsOpen(true)}>
              Settings
            </Button>
            <Box flexGrow={1} />
            <ThemeToggleButton />
          </Toolbar>
        </AppBar>

        <Box mt={4}>
          <Routes>
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/userauth" element={<UserAuth />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<UserAuthLogout />} />
          </Routes>
        </Box>

        <SnackList />
        <SettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </Container>
    </Router>
  );
}

export default App;

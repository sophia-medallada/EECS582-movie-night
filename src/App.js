// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 3/15/25
// Purpose: Combines all the seperate application portions and bundles them together into a final render

//import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SearchMovies from "./components/SearchMovies";
import SchedulePage from "./components/SchedulePage";


import './styles/App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <nav className="tab-nav">
          <Link to="/search">Movie Search</Link>
          <Link to="/schedule">Schedule</Link>
        </nav>
        <Routes>
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/schedule" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;


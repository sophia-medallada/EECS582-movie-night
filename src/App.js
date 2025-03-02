// Authors: Sophia, Eli, Damian, Matthew and Abraham
// Date: 2/13/25
// Last Modified: 2/16/25
// Purpose: Combines all the seperate application portions and bundles them together into a final render

//import logo from './logo.svg';
import './App.css';
import SearchMovies from "./SearchMovies";
import DynamicList from "./watchlist";
import TimeTable from './TimeTable';


function App() {
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <SearchMovies /> {/*renders the search bar and movie results*/}
      <DynamicList /> {/*renders the dynamic list used for the watchlist*/}
      <TimeTable /> {/*Experimental test*/}
    </div>
  );
}

export default App;

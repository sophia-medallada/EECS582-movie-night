import logo from './logo.svg';
import './App.css';
import SearchMovies from "./SearchMovies";
import DynamicList from "./watchlist";


function App() {
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <SearchMovies /> {/*renders the search bar and movie results*/}
      <DynamicList /> {/*renders the dynamic list used for the watchlist*/}
    </div>
  );
}

export default App;

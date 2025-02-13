import logo from './logo.svg';
import './App.css';
import SearchMovies from "./SearchMovies";


function App() {
  return (
    <div className="App">
      <h1>Movie Search</h1>
      <SearchMovies /> {/*renders the search bar and movie results*/}
    </div>
  );
}

export default App;

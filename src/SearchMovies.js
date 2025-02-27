//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 2/27/25
//Purpose: Adds search functionality to the website using the TMDB API
import "./SearchMovies.css";
import React, { useState } from "react";
import { fetchMovies } from "./MovieService";

const SearchMovies = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    //HandleSearch makes sure search bar is being used properly.
    const handleSearch = async(event) => {
        event.preventDefault();
        console.log("handleSearch called with ", query);
        //Logs that the search bar was empty
        if (!query.trim()){
            console.log("Empty search executed");
        }
        //Uses the search and fetches and logs the results.
        try {
            const results = await fetchMovies(query);
            console.log("Fetched movies: ", results);
            setMovies(results);
        //If an error occurs, then it is reported to the console
        } catch (error){
            console.error("Error in handleSearch", error);
        }
    };

    const handleFilter = async(event) => {
        console.log("filter button clicked");
    }

    //Displays the search results on the main webpage in html
    // Placeholder design for now
    return (
        <div className="search-container">
            {/*onSubmit adds a form for users to submit queries on a search bar. */}
            <form className="search=bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>

                {/*Replace handle filter with something that changes the search query*/} 
                <button type="button" onClick={handleFilter}>Filter</button>
            </form>
            {/*The result from the query are shown to the user with the title and poster*/}
            <div>
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-result">
                        <h3>{movie.title}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            style={{ width: "200px", height: "300px" }}
                        />
                        <div> {/*Placeholder buttons for calendar, favorites, watch later functionality*/} 
                            <button onClick={() => console.log("Add to Calendar clicked for: ", movie.title)}>
                                Add to Calendar
                            </button>
                            <button onClick={() => console.log("Add to Favorites clicked for: ", movie.title)}>
                                Add to Favorites
                            </button>
                            <button onClick={() => console.log("Add to Watch Later clicked for: ", movie.title)}>
                                Add to Watch Later
                            </button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );

};

export default SearchMovies;
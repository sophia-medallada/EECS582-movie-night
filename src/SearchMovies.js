//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 2/16/25
//Purpose: Adds search functionality to the website using the TMDB API
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

    //Displays the search results on the main webpage in html
    return (
        <div>
            {/*onSubmit adds a form for users to submit queries on a search bar. */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {/*The result from the query are shown to the user with the title and poster*/}
            <div>
                {movies.map((movie) => (
                    <div key={movie.id}>
                        <h3>{movie.title}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

};

export default SearchMovies;
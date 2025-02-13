import React, { useState } from "react";
import { fetchMovies } from "./MovieService";

const SearchMovies = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);

    const handleSearch = async(event) => {
        event.preventDefault();
        console.log("handleSearch called with ", query);

        if (!query.trim()){
            console.log("Empty search executed");
        }

        try {
            const results = await fetchMovies(query);
            console.log("Fetched movies: ", results);
            setMovies(results);
        } catch (error){
            console.error("Error in handleSearch", error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

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
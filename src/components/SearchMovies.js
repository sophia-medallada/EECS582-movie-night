//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 3/1/25
//Purpose: Adds search functionality to the website using the TMDB API
import "../styles/SearchMovies.css";
import React, { useState, useEffect } from "react";
//import { fetchMovies } from "../services/MovieService";
import { fetchMovies, fetchProviders } from "../services/MovieService";

//list out all the available genres of movies
const availableTags = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"];

//adds state of the functional components in the search movies 
const SearchMovies = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    //HandleSearch makes sure search bar is being used properly.
    const handleSearch = async (event) => {
        event.preventDefault();
        //Logs that the search bar was empty
        if (!query.trim()) return;
        //Uses the search and fetches and logs the results.
        try {
            const results = await fetchMovies(query);
            console.log("Fetched movies: ", results);
            setMovies(results);
            setFilteredMovies(results); 
        //If an error occurs, then it is reported to the console
        } catch (error) {
            console.error("Error in handleSearch", error);
        }
    };

    // Toggles tags on/off when clicked
    const toggleTag = (tag) => {
        setSelectedTags((prevTags) => {
            const newTags = prevTags.includes(tag)
                ? prevTags.filter((t) => t !== tag)  // Remove if already selected
                : [...prevTags, tag]; // Add if not selected
            console.log("Updated Selected Tags:", newTags);
            return newTags; 
        });
    };

    // Apply filtering automatically when tags or movies change
    useEffect(() => {
        //prints the selected movies from the selected tags
        console.log("Selected tags:", selectedTags);
        console.log("Movies before filter:", movies);
        
        if (selectedTags.length === 0) {
            setFilteredMovies(movies);
            return;
        }
        
        const filtered = movies.filter((movie) =>
            movie.genre_names.some((genre) => selectedTags.includes(genre))
        );
        
        console.log("Movies after filter:", filtered);
        setFilteredMovies(filtered);
    }, [selectedTags, movies]);

    //Displays the search results on the main webpage in html
    // Placeholder design for now   
    return (
        <div className="search-container">
            {/*onSubmit adds a form for users to submit queries on a search bar. */}
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {/*To submit tags on the selected genres of tags*/}
            <div className="tag-filter">
                {availableTags.map((tag) => (
                    <button
                        key={tag}
                        className={selectedTags.includes(tag) ? "tag-selected" : "tag"}
                        onClick={() => toggleTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Movie Results (Filtered) */}
            <div>
                {filteredMovies.length === 0 ? (
                    <p>No movies found for the selected tags.</p>
                ) : (
                    filteredMovies.map((movie) => (
                        <div key={movie.id} className="movie-result">
                            <h3>{movie.title}</h3>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p>Genres: {movie.genre_names?.join(", ") || "N/A"}</p>
                            {/*Placeholder buttons for calendar, favorites, watch later, view providers functionality*/} 
                            <div className="button-group">
                                <button onClick={() => console.log("Add to Calendar:", movie.title)}>
                                    Add to Calendar
                                </button>
                                <button onClick={() => console.log("Add to Favorites:", movie.title)}>
                                    Add to Favorites
                                </button>
                                <button onClick={() => console.log("Add to Watch Later:", movie.title)}>
                                    Add to Watch Later
                                </button>
                                {/*Button that finds the streaming providers and prints them into the console*/}
                                <button onClick={() => console.log(fetchProviders(movie.id))}> 
                                    See Providers
                                </button>
                                
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchMovies;

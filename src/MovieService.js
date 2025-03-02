//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 3/1/25
//Purpose: Gets the TMDB API Key and uses it to manage queries.

//API_KEY and BASE_URL are used to get the api keys and make calls for search functionality.
//API provided by The Movie Database
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Cache genres to avoid API calls
let cachedGenres = [];

// Fetch genres once and store them
export const fetchGenres = async () => {
    if (cachedGenres.length > 0) return cachedGenres;
    
    try {
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        cachedGenres = data.genres || [];
        console.log("Fetched genres:", cachedGenres); // Debugging step
        return cachedGenres;
    } catch (error) {
        console.error("Error fetching genres: ", error);
        return [];
    }
};

//fetchMovies gets the query from the user and uses the TMDB API to look for it in the database.
export const fetchMovies = async (query) => {
    //If the query is successful, then the results are stored in data and can be used later on such as showing results from the search bar.
    try {
        // Construct request for https://api.themoviedb.org using qeury and API key
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        // Wait for the response
        const data = await response.json();

        const genres = await fetchGenres();
        console.log("Fetched genres:", genres); 
        // Return the reponse, even if it contained no results
        return (data.results || []).map((movie) => ({
            ...movie,
            genre_names: movie.genre_ids.map((id) => 
                genres.find((g) => g.id === id)?.name || "Unknown"
            ).filter(Boolean), // Remove undefined values
        }));
    //If the query failed, then there will error given in the console about issue.
    } catch (error) {
        console.error("Error fetching movies: ", error);
        return [];
    }
};

// fetches the streaming providers for the films and shows
export const fetchProviders = async (movie_id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movie_id}/watch/providers?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results || [];
    //If the query failed, then there will error given in the console about issue.
    } catch (error){
        console.error("Error fetching Movie Providers: ", error);
        return [];
    }
}

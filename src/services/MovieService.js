//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 3/30/25
//Purpose: Gets the TMDB API Key and uses it to manage queries.

//API_KEY and BASE_URL are used to get the api keys and make calls for search functionality.
//API provided by The Movie Database
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Cache genres to avoid API calls
let cachedGenres = [];
let cachedCertifications = [];

// Fetch genres once and store them
export const fetchGenres = async () => {
    if (cachedGenres.length > 0) return cachedGenres;
    try {
        // Construct request for https://api.themoviedb.org using base url and API key
        const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
        //awaits for the response
        const data = await response.json();
        //returns the response
        cachedGenres = data.genres || [];
        console.log("Fetched genres:", cachedGenres); 
        return cachedGenres;
    //gives an error message if it can't fetch the genres
    } catch (error) {
        console.error("Error fetching genres: ", error);
        return [];
    }
};

//fetchMovies gets the query from the user and uses the TMDB API to look for it in the database.
export const fetchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();

        const genres = await fetchGenres();
        const certifications = await fetchCertifications(); // Fetch certifications

        console.log("Fetched genres:", genres);
        console.log("Fetched certifications:", certifications);

        return (data.results || []).map((movie) => {
            const certification = certifications.find(cert => cert.movie_id === movie.id); // Find the certification for the movie
            return {
                ...movie,
                genre_names: movie.genre_ids.map((id) => 
                    genres.find((g) => g.id === id)?.name || "Unknown"
                ).filter(Boolean),
                certification: certification?.certification || "N/A" // Add certification to the movie data
            };
        });
    } catch (error) {
        console.error("Error fetching movies: ", error);
        return [];
    }
};


// fetches the streaming providers for the films and shows
export const fetchProviders = async (movie_id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movie_id}/watch/providers?api_key=${API_KEY}&results=US`);
        const data = await response.json();
        
        const usProviders = data.results?.US?.flatrate ||
                            data.results?.US?.rent ||
                            data.results?.US?.buy || [];

        return usProviders;
    //If the query failed, then there will error given in the console about issue.
    } catch (error){
        console.error("Error fetching Movie Providers: ", error);
        throw error;
    }
}

export const fetchCertifications = async () => {
    if (cachedCertifications.length > 0) return cachedCertifications;
    try {
        // Construct request for TMDB API
        const response = await fetch(`${BASE_URL}/rating/movie/list?api_key=${API_KEY}`);
        const data = await response.json();

        // Filter for US certifications
        cachedCertifications = data.certifications.US || [];
        console.log("Fetched certifications:", cachedCertifications);

        return cachedCertifications;
    } catch (error) {
        console.error("Error fetching certifications: ", error);
        return [];
    }
};
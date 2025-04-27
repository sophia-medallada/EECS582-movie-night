//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 4/27/25
//Purpose: Gets the TMDB API Key and uses it to manage queries.

//API_KEY and BASE_URL are used to get the api keys and make calls for search functionality.
//API provided by The Movie Database
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Cache genres to avoid API calls
let cachedGenres = [];
let cachedCertifications = [];
//let cachedRecommendations = [];

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
        //search movies by query
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();

        //fetches genres 
        const genres = await fetchGenres();
        
        // Get detailed movie info including certification for each movie
        const moviesWithDetails = await Promise.all(
            (data.results || []).map(async (movie) => {
                try {
                    const detailsResponse = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=release_dates`);
                    const details = await detailsResponse.json();
                    
                    // Find US certification
                    let certification = "N/A";
                    if (details.release_dates && details.release_dates.results) {
                        const usRelease = details.release_dates.results.find(r => r.iso_3166_1 === "US");
                        if (usRelease && usRelease.release_dates.length > 0) {
                            certification = usRelease.release_dates[0].certification || "N/A";
                        }
                    }
                    
                    return {
                        ...movie,
                        genre_names: movie.genre_ids.map((id) => 
                            genres.find((g) => g.id === id)?.name || "Unknown"
                        ).filter(Boolean),
                        certification: certification
                    };
                } catch (error) {
                    console.error(`Error fetching details for movie ${movie.id}:`, error);
                    return {
                        ...movie,
                        genre_names: movie.genre_ids.map((id) => 
                            genres.find((g) => g.id === id)?.name || "Unknown"
                        ).filter(Boolean),
                        certification: "N/A"
                    };
                }
            })
        );

        return moviesWithDetails;
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
        
        //US providers of the flatrate, rent and buy
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

//fetch movie certifications (e.g., PG, PG-13, R)
export const fetchCertifications = async () => {
    if (cachedCertifications.length > 0) return cachedCertifications;
    try {
        //construct request for TMDB API
        const response = await fetch(`${BASE_URL}/certification/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        
        // This returns the list of possible certifications, not movie-specific ones
        cachedCertifications = data.certifications.US || [];
        console.log("Fetched possible certifications:", cachedCertifications);
        
        return cachedCertifications;
    } catch (error) {
        console.error("Error fetching certifications: ", error);
        return [];
    }
};

//fetchces similar movies from the given movie id
export const fetchSimilarMovies = async (movie_id) => {
    try {
        //calls the API key to get similar movies provided by the movie ID
        const response = await fetch(`${BASE_URL}/movie/${movie_id}/similar?api_key=${API_KEY}`);
        const data = await response.json();
        //fetches the genres of the movie data
        const genres = await fetchGenres();
        
        //returns a formated list of the list of similar movies
        const moviesWithDetails = await Promise.all(
            (data.results || []).map(async (movie) => {
                try {
                    const detailsResponse = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&append_to_response=release_dates`);
                    const details = await detailsResponse.json();
                    
                    let certification = "N/A";
                    if (details.release_dates && details.release_dates.results) {
                        const usRelease = details.release_dates.results.find(r => r.iso_3166_1 === "US");
                        if (usRelease && usRelease.release_dates.length > 0) {
                            certification = usRelease.release_dates[0].certification || "N/A";
                        }
                    }
                    //genre id to genre names
                    return {
                        ...movie,
                        genre_names: movie.genre_ids.map((id) =>
                            genres.find((g) => g.id === id)?.name || "Unknown"
                        ).filter(Boolean),
                        certification: certification
                    };
                //If the query failed, then there will error given in the console about issue.
                } catch (error) {
                    console.error(`Error fetching details for similar movie ${movie.id}:`, error);
                    return {
                        ...movie,
                        genre_names: movie.genre_ids.map((id) =>
                            genres.find((g) => g.id === id)?.name || "Unknown"
                        ).filter(Boolean),
                        certification: "N/A"
                    };
                }
            })
        );

        return moviesWithDetails;
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        return [];
    }
};
  
//fetchs actors from the given movie
export const fetchMovieCredits = async (movie_id) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movie_id}/credits?api_key=${API_KEY}`);
        const data = await response.json();
        return data.cast || [];
    } catch (error) {
        console.error("Error fetching cast: ", error);
        return [];
    }};

//fetch detail information about the actor
//includes bio and list of movies they're in 
export const fetchPersonDetails = async (person_id) => {
    try {
        const [detailsResponse, creditsResponse] = await Promise.all([
            fetch(`${BASE_URL}/person/${person_id}?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/person/${person_id}/movie_credits?api_key=${API_KEY}`)
        ]);
    
        const details = await detailsResponse.json();
        const credits = await creditsResponse.json();
    
        return {
            ...details,
            movies: credits.cast || []
        };
    } catch (error) {
        console.error("Error fetching person details:", error);
        return null;
        }
};

  


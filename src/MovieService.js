//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 2/16/25
//Purpose: Gets the TMDB API Key and uses it to manage queries.

//API_KEY and BASE_URL are used to get the api keys and make calls for search functionality.
//API provided by The Movie Database
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//fetchMovies gets the query from the user and uses the TMDB API to look for it in the database.
export const fetchMovies = async (query) => {
    //If the query is successful, then the results are stored in data and can be used later on such as showing results from the search bar.
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();
        return data.results || [];
    //If the query failed, then there will error given in the console about issue.
    } catch (error){
        console.error("Error fetching movies: ", error);
        return [];
    }
}
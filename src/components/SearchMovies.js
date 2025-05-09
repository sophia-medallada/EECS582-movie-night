//Authors: Sophia, Eli, Damian, Matthew and Abraham
//Date: 2/13/25
//Last Modified: 4/27/25
//Purpose: Adds search functionality to the website using the TMDB API

//imports react
import React, { useState, useEffect } from "react";
import { fetchMovies, fetchProviders, fetchCertifications, fetchSimilarMovies, fetchMovieCredits } from "../services/MovieService";
import { Link } from "react-router-dom";

//imports material-ui
import {
  Box,
  Button,
  Typography,
  TextField,
  Stack,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Chip,
} from "@mui/material";

// list of available genres
const availableTags = ["Action", "Drama", "Comedy", "Horror", "Sci-Fi", "Romance"];
// list of available movie certifications
const availableCertifications = ["G", "PG", "PG-13", "R", "NC-17"];

//adds state of the functional components in the search movies 
const SearchMovies = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCertifications, setSelectedCertifications] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [providers, setProviders] = useState([]);
  const [recommendations, setRecommendations] = useState({});
  const [loadingRecommendations, setLoadingRecommendations] = useState({});

  // new states to manage cast data
  const [castData, setCastData] = useState({});
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  // fetch certifications once
  useEffect(() => {
    const loadCertifications = async () => {
      const fetchedCerts = await fetchCertifications();
      setCertifications(fetchedCerts.map(cert => cert.certification));
    };
    loadCertifications();
  }, []);

  // fetch similar movies for recommendations
  const handleFetchRecommendations = async (movieID) => {
    setLoadingRecommendations(prev => ({ ...prev, [movieID]: true }));
    try {
      const similarMovies = await fetchSimilarMovies(movieID);
      //stores first 3 recommendations
      setRecommendations(prev => ({
        ...prev,
        [movieID]: similarMovies.slice(0, 3)
      }));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoadingRecommendations(prev => ({ ...prev, [movieID]: false }));
    }
  };

  // fetch movie cast and toggle display
  const handleFetchCast = async (movieID) => {
    if (castData[movieID]) {
      setSelectedMovieId(selectedMovieId === movieID ? null : movieID);
      return;
    }
    try {
      const castList = await fetchMovieCredits(movieID);
      setCastData(prev => ({ ...prev, [movieID]: castList }));
      setSelectedMovieId(movieID);
    } catch (error) {
      console.error("Error loading cast:", error);
    }
  };

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
    setSelectedTags((prevTags) => prevTags.includes(tag) ? prevTags.filter(t => t !== tag) : [...prevTags, tag]);
  };

  // toggle certification selection
  const toggleCertification = (cert) => {
    setSelectedCertifications((prevCerts) =>
      prevCerts.includes(cert) ? prevCerts.filter((c) => c !== cert) : [...prevCerts, cert]
    );
  };

  // Apply filtering automatically when tags or movies change
  useEffect(() => {
    let filtered = movies;
    // Filter by genres
    if (selectedTags.length > 0) {
      filtered = filtered.filter(movie => 
        movie.genre_names.some(genre => selectedTags.includes(genre))
      );
    }
    // Filter by certifications
    if (selectedCertifications.length > 0) {
      filtered = filtered.filter(movie => 
        selectedCertifications.includes(movie.certification)
      );
    }
    setFilteredMovies(filtered);
  }, [selectedTags, selectedCertifications, movies]);

  // fetch streaming providers for the selected movie
  const handleFetchProviders = async (movieID) => {
    setIsLoading(true);
    try {
      const providersData = await fetchProviders(movieID);
      setProviders(providersData);
      setIsVisible(true);
    } catch (error) {
      console.error("Failed to load providers in component:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //Displays the search results on the main webpage in html
  // Placeholder design for now   
  return (
    <Box sx={{ p: 4 }}>
      <form onSubmit={handleSearch}>
        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Stack>
      </form>
      {/* Genre tag filters */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
        {availableTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant={selectedTags.includes(tag) ? "filled" : "outlined"}
            color="primary"
            onClick={() => toggleTag(tag)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Stack>
      
      {/* Certification filters */}
      <Stack direction="row" spacing={1} flexWrap="wrap" mb={3}>
        {availableCertifications.map((cert) => (
          <Chip
            key={cert}
            label={cert}
            variant={selectedCertifications.includes(cert) ? "filled" : "outlined"}
            color="secondary"
            onClick={() => toggleCertification(cert)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Stack>
      {/* Movie results section */}
      {filteredMovies.length === 0 ? (
        <Typography>No movies found for the selected filters.</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* render movie cards */}
          {filteredMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography variant="body2" gutterBottom>
                    Certification: {movie.certification || "N/A"}
                  </Typography>
                  <Typography variant="body2">
                    Genres: {movie.genre_names?.join(", ") || "N/A"}
                  </Typography>
                  {/* Action buttons */}
                  <Stack direction="row" spacing={1} mt={2} flexWrap="wrap">
                    <Button size="small" variant="outlined" onClick={() => console.log("Calendar", movie.title)}>Add to Calendar</Button>
                    <Button size="small" variant="outlined" onClick={() => console.log("Favorites", movie.title)}>Add to Favorites</Button>
                    <Button size="small" variant="outlined" onClick={() => console.log("Watch Later", movie.title)}>Watch Later</Button>
                    <Button size="small" variant="contained" onClick={() => handleFetchProviders(movie.id)}>
                      {isLoading ? <CircularProgress size={16} /> : "Show Where to Watch"}
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => handleFetchRecommendations(movie.id)} disabled={loadingRecommendations[movie.id]}>
                      {loadingRecommendations[movie.id] ? <CircularProgress size={16} /> : "Get Recommendations"}
                    </Button>
                    <Button size="small" variant="outlined" onClick={() => handleFetchCast(movie.id)}>
                      {selectedMovieId === movie.id ? "Hide Cast" : "Cast Info"}
                    </Button>
                  </Stack>

                  {/* streaming providers section */}
                  {isVisible && providers.length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Providers (US):</Typography>
                      <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
                        {providers.map((provider) => (
                          <Box key={provider.provider_id} textAlign="center">
                            <img
                              src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                              alt={provider.provider_name}
                              width={48}
                              height={48}
                              style={{ borderRadius: 6 }}
                            />
                            <Typography variant="caption">{provider.provider_name}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/*Displays movie recommendations */}
                  {recommendations[movie.id] && recommendations[movie.id].length > 0 && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Recommendations:</Typography>
                      <Grid container spacing={1} mt={1}>
                        {recommendations[movie.id].map((recMovie) => (
                          <Grid item xs={4} key={recMovie.id}>
                            <Box textAlign="center">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${recMovie.poster_path}`}
                                alt={recMovie.title}
                                width={60}
                                height={90}
                                style={{ borderRadius: 4 }}
                              />
                              <Typography variant="caption" display="block">
                                {recMovie.title}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* cast section */}
                  {selectedMovieId === movie.id && castData[movie.id] && (
                    <Box mt={2}>
                      <Typography variant="subtitle2">Cast:</Typography>
                      <Grid container spacing={1}>
                        {castData[movie.id].slice(0, 6).map((actor) => (
                          <Grid item xs={4} key={actor.id}>
                            <Box textAlign="center">
                              <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                width={60}
                                height={90}
                                style={{ borderRadius: 4, objectFit: "cover" }}
                              />
                              <Link to={`/actor/${actor.id}`} style={{ textDecoration: "none" }}>
                                <Typography variant="caption" display="block">
                                  {actor.name}
                                </Typography>

                              </Link>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SearchMovies;

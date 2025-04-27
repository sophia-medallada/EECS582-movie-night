//Author: Sophia
//Date: 4/27/25
//Last Modified: 4/27/25
//Purpose: Displays Actor Details including Bio and Movies List

//import  react
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
//imports the cast details from the movie service
import { fetchPersonDetails } from "../services/MovieService";
//imports the material-ui components
import { Typography, CircularProgress, Button } from "@mui/material";
//styling for the actor details page
import "../styles/ActorDetails.css"; 

//actor details components
const ActorDetails = () => {
  const { id } = useParams(); //gets the actors id from the parameters
  const [actor, setActor] = useState(null); //stores the actor details
  const [loading, setLoading] = useState(true); //loading state

  // Fetch actor details on component mount
  useEffect(() => {
    const loadActor = async () => {
      try {
        const data = await fetchPersonDetails(id); //fetches the actor's details by id
        setActor(data); //save the actor's details

      } catch (error) {
        console.error("Error fetching actor details:", error);
      } finally {
        setLoading(false); //stops loading after each fetch attempt
      }
    };
    loadActor();
  }, [id]);

  //loading spinner
  if (loading) {
    return (
      <div className="actor-container" style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }
  //if data of actor is not found
  if (!actor) {
    return <Typography variant="h6" align="center" mt={5}>Actor not found.</Typography>;
  }
  //actor's page
  return (
    <div className="actor-container">
      {/* Button to go back to search page */}
      <Button variant="outlined" component={Link} to="/" className="back-button">
        ← Back to Search
      </Button>
      {/* Actor's profile image and name */}
      <div className="actor-header">
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            className="actor-image"
          />
        )}
        <Typography className="actor-name">{actor.name}</Typography>
      </div>
       {/* Actor's biography */}
      <div className="actor-biography">
        <Typography variant="h6" gutterBottom>Biography</Typography>
        <Typography>{actor.biography || "No biography available."}</Typography>
      </div>
      {/* Grid of other movies the actor appeared in */}
      <div className="movie-grid">
        {actor.movies.slice(0, 12).map((movie) => (
          <div key={movie.id} className="movie-card">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
            <Typography variant="caption">{movie.title}</Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActorDetails;
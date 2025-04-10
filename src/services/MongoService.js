// Author: Damian Mendez
// Date: 4/2/2025
//Last Modified: 4/2/2025
//Purpose: Creates the api service that our front end can call using a local host call while our backend handles connectivity.

const API_URL = 'http://localhost:5000/api';

export const fetchMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const createMovie = async (movieData) => {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const updateMovie = async (id, movieData) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
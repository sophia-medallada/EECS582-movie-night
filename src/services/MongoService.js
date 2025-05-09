// Author: Damian Mendez
// Date: 4/2/2025
//Last Modified: 4/27/2025
//Purpose: Creates the api service that our front end can call using a local host call while our backend handles connectivity.

const API_URL = 'http://localhost:5000/api';

//Get all Movies
export const fetchMovies = async () => {
  const response = await fetch(`${API_URL}/movies`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get a Movie with a certain ID
export const fetchMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Create a Movie
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

// Update a movie entry with a certain ID
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

// Delete a movie with a certain ID
export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get all Profiles
export const fetchProfiles = async () => {
  const response = await fetch(`${API_URL}/profiles`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get a Profile with a certain ID
export const fetchProfile = async (id) => {
  const response = await fetch(`${API_URL}/profiles/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get a Profile with a certain email
export const fetchProfileByEmail = async (email) => {
  const response = await fetch(`${API_URL}/profiles/email?email=${encodeURIComponent(email)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Create a Profile
export const createProfile = async (profileData) => {
  const response = await fetch(`${API_URL}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Update a profile with a certain ID
export const updateProfile = async (id, profileData) => {
  const response = await fetch(`${API_URL}/profiles/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Delete a profile with a certain ID
export const deleteProfile = async (id) => {
  const response = await fetch(`${API_URL}/profiles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};


//Get all Lists
export const fetchLists = async () => {
  const response = await fetch(`${API_URL}/calenderlists`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get a List with a certain ID
export const fetchList = async (id) => {
  const response = await fetch(`${API_URL}/calenderlists/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

//Get a List with a certain email
export const fetchListByDate = async (date) => {
  const response = await fetch(`${API_URL}/calenderlists/date?date=${encodeURIComponent(date)}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Create a List
export const createList = async (listData) => {
  const response = await fetch(`${API_URL}/calenderlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Update a list with a certain ID
export const updateList = async (id, listData) => {
  const response = await fetch(`${API_URL}/calenderlists/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(listData),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// Delete a list with a certain ID
export const deleteList = async (id) => {
  const response = await fetch(`${API_URL}/calenderlists/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Genre = () => {
  const [genres, setGenres] = useState([]); // State to store kategori data

  // Fetch kategori data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/kategori') // Replace with your backend URL
      .then((response) => {
        setGenres(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching kategori data:', error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
      <ul className="space-y-2">
        {genres.map((genre) => (
          <li key={genre._id}>
            <a href="#" className="text-blue-600 hover:underline">{genre.nama_kategori}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;
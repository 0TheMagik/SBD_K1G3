import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the public endpoint instead
    axios
      .get('http://localhost:3000/api/kategori/public')
      .then((response) => {
        setGenres(response.data);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching kategori data:', error);
        setError('Could not load genres');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
        <div className="py-4 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
        <div className="py-4 text-center text-gray-500">Could not load genres</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
      {genres.length === 0 ? (
        <div className="py-4 text-center text-gray-500">No genres available</div>
      ) : (
        <ul className="space-y-2">
          {genres.map((genre) => (
            <li key={genre._id}>
              <Link 
                to={`/category/${genre.nama_kategori.toLowerCase()}`} 
                className="text-blue-600 hover:underline"
              >
                {genre.nama_kategori}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Genre;
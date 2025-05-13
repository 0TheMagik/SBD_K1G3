import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PopularStories = () => {
  const [popularStories, setPopularStories] = useState([]); // State to store popular stories

  // Fetch popular stories from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/buku/popular') // Replace with your backend URL
      .then((response) => {
        setPopularStories(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching popular stories:', error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularStories.map((story) => (
          <div key={story._id} className="group cursor-pointer">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mb-3">
              <img
                src={story.imageUrl || 'https://via.placeholder.com/300x400'} // Use a placeholder if no image URL is provided
                alt={story.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
              {story.judul}
            </h3>
            <p className="text-gray-600">{story.penulis}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularStories;
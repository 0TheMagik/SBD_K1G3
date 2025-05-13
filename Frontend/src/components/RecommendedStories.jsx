import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecommendedStories = () => {
  const [recommendedStories, setRecommendedStories] = useState([]); // State to store random stories

  // Fetch random stories from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/buku/random') // Replace with your backend URL
      .then((response) => {
        setRecommendedStories(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching recommended stories:', error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedStories.map((story) => (
          <div key={story._id} className="group cursor-pointer">
            <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
              <img
                src={story.imageUrl || 'https://via.placeholder.com/200x300'} // Use a placeholder if no image URL is provided
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

export default RecommendedStories;
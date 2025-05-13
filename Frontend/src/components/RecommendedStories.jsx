import React from 'react';

const RecommendedStories = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "The Last Kingdom", image: "https://via.placeholder.com/200x300/FF5733/FFFFFF?text=Story+1" },
          { title: "Moonlight Shadows", image: "https://via.placeholder.com/200x300/33FF57/FFFFFF?text=Story+2" },
          { title: "Dragon's Heart", image: "https://via.placeholder.com/200x300/3357FF/FFFFFF?text=Story+3" },
          { title: "Silent Whispers", image: "https://via.placeholder.com/200x300/FF33A8/FFFFFF?text=Story+4" },
          { title: "Ocean's Fury", image: "https://via.placeholder.com/200x300/33FFF5/FFFFFF?text=Story+5" },
          { title: "Golden Sands", image: "https://via.placeholder.com/200x300/F5FF33/FFFFFF?text=Story+6" },
          { title: "Midnight Tales", image: "https://via.placeholder.com/200x300/8A2BE2/FFFFFF?text=Story+7" },
          { title: "Crimson Winter", image: "https://via.placeholder.com/200x300/FF7F50/FFFFFF?text=Story+8" },
          { title: "Starlight Journey", image: "https://via.placeholder.com/200x300/6495ED/FFFFFF?text=Story+9" }
        ].map((story, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
              <img 
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{story.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedStories;

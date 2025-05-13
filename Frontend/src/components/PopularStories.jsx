import React from 'react';

const PopularStories = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="group cursor-pointer">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mb-3">
            <img 
              src="https://pbs.twimg.com/media/Gqy18FWW4AAxBr5?format=jpg&name=4096x4096" 
              alt="Story Cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            Bite Me
          </h3>
        </div>

        <div className="group cursor-pointer">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mb-3">
            <img 
              src="https://via.placeholder.com/300x400" 
              alt="Story Cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            Strip for the Devil
          </h3>
        </div>

        <div className="group cursor-pointer">
          <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg mb-3">
            <img 
              src="https://via.placeholder.com/300x400" 
              alt="Story Cover"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
            Forbidden Love
          </h3>
        </div>
      </div>
    </div>
  );
};

export default PopularStories;

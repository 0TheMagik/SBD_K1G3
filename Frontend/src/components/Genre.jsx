import React from 'react';

const Genre = () => {
  const genres = [
    "Romance", "Fantasy", "Sci-Fi", "Horror", "Mystery", 
    "Thriller", "Comedy", "Inspiratif", "Sejarah", "Psikologi",
    "Family", "Adventure", "Slice of Life", "Drama", "Supernatural",
    "Action"
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
      <ul className="space-y-2">
        {genres.map((genre, index) => (
          <li key={index}>
            <a href="#" className="text-blue-600 hover:underline">{genre}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genre;

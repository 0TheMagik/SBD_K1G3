import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateTerbaru = () => {
  const [terbaruBooks, setTerbaruBooks] = useState([]); // State to store terbaru books

  // Fetch terbaru books from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/buku/terbaru') // Replace with your backend URL
      .then((response) => {
        setTerbaruBooks(response.data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching terbaru books:', error);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl text-black font-bold mb-4">Update Terbaru</h2>
      <ul className="space-y-3">
        {terbaruBooks.map((book) => (
          <li key={book._id} className="border-b pb-2 last:border-b-0">
            <a href="#" className="hover:text-blue-600 text-sm">
              {book.judul} by {book.penulis}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateTerbaru;
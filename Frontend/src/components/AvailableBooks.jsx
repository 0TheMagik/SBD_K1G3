import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

const AvailableBooks = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({});

  // Define a utility function to safely get category names
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Uncategorized';
    return categories[categoryId] || 'Uncategorized';
  };

  useEffect(() => {
    // Create a function to load all data
    const loadData = async () => {
      try {
        // First try to load categories
        try {
          const categoryResponse = await axios.get('http://localhost:3000/api/kategori/public');
          
          // Map categories to an object for easy lookup
          const categoryMap = {};
          categoryResponse.data.forEach(cat => {
            categoryMap[cat._id] = cat.nama_kategori;
          });
          setCategories(categoryMap);
        } catch (err) {
          console.error("Failed to load categories:", err);
          // Continue even if categories fail to load
        }

        // Then load available books
        try {
          const booksResponse = await axios.get('http://localhost:3000/api/buku/available');
          setAvailableBooks(booksResponse.data);
        } catch (err) {
          console.error("Failed to load available books:", err);
          setError("Could not load available books");
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Could not load available books");
      } finally {
        setLoading(false);
      }
    };

    // Call the function to load data
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available for Borrowing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || availableBooks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available for Borrowing</h2>
        <div className="p-6 text-center text-gray-500">
          {error ? 'Could not load available books' : 'No books available for borrowing at this time'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Available for Borrowing</h2>
        <Link 
          to="/available-books" 
          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
        >
          See all
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableBooks.slice(0, 8).map((book) => (
          <Link to={`/book/${book._id}`} key={book._id} className="group cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-t-lg bg-gray-100 relative">
              {/* Available badge */}
              <div className="absolute top-2 right-2 rounded-full text-xs px-2 py-1 font-medium z-10 bg-green-100 text-green-800">
                Available
              </div>
              
              {/* Book cover */}
              {book.image_url ? (
                <img
                  src={book.image_url}
                  alt={book.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x400?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                {book.judul}
              </h3>
              <p className="text-gray-600 mb-2">{book.penulis}</p>
              
              {/* Rating display */}
              <div className="flex items-center my-2">
                <StarRating rating={book.rating} />
                <span className="ml-2 text-sm text-gray-500">
                  {book.rating ? `${book.rating.toFixed(1)}/5` : 'No ratings'}
                </span>
              </div>
              
              {/* Category and Year */}
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                  {getCategoryName(book.kategori)}
                </span>
                <span className="text-gray-500">
                  {book.tahun_terbit || 'N/A'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvailableBooks;
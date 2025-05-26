import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import CategoryHeader from './CategoryHeader';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/buku/category-name/${categoryName}`);
        
        setCategoryBooks(response.data.books);
        setCategoryInfo(response.data.category);
        setError(null);
      } catch (err) {
        console.error('Error fetching category books:', err);
        setError(`Could not load books for category "${categoryName}"`);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryInfo) {
    return (
      <div className="container mx-auto p-4 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h2>
          <p className="text-gray-600 mb-6">{error || `The category "${categoryName}" could not be found.`}</p>
          <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <CategoryHeader category={categoryInfo} />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {categoryBooks.length} {categoryBooks.length === 1 ? 'Book' : 'Books'} in {categoryInfo.nama_kategori}
          </h2>

          {categoryBooks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No books found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryBooks.map((book) => (
                <Link 
                  to={`/book/${book._id}`} 
                  key={book._id} 
                  className="group cursor-pointer border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-t-lg bg-gray-100 relative">
                    {/* Availability badge */}
                    <div className={`absolute top-2 right-2 rounded-full text-xs px-2 py-1 font-medium z-10 ${
                      book.tersedia === 'tersedia' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {book.tersedia === 'tersedia' ? 'Available' : 'Not Available'}
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
                    
                    {/* Year */}
                    <div className="flex items-center justify-end mt-2 text-sm">
                      <span className="text-gray-500">
                        {book.tahun_terbit || 'N/A'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
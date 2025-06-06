import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const RankingPage = () => {
  const [topBooks, setTopBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  // Define a utility function to safely get category names
  const getCategoryName = (categoryId) => {
    if (!categoryId) return 'Uncategorized';
    return categoryId.nama_kategori || 'Uncategorized';
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Updated endpoint to use the public available endpoint
        const booksResponse = await axios.get('http://localhost:3000/api/buku/popular-books');
        
        if (booksResponse.data && Array.isArray(booksResponse.data)) {
          setTopBooks(booksResponse.data);
        } else {
          setTopBooks([]);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching ranking data:', err);
        setError('Could not load book rankings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        currentUser={currentUser}
        logout={logout}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Top-Rated Books</h1>
            <div className="text-gray-600">
              {loading ? 
                "Loading..." : 
                `${topBooks.length} Books Ranked by Rating`
              }
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex p-4 border-b">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex-shrink-0 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              {error}
            </div>
          ) : topBooks.length > 0 ? (
            <div className="space-y-4">
              {topBooks.map((book, index) => (
                <Link to={`/book/${book._id}`} key={book._id} className="block">
                  <div className="flex border-b pb-4 hover:bg-gray-50 p-4 rounded transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-800 font-bold text-xl">#{index + 1}</span>
                    </div>
                    
                    <div className="flex flex-1 items-center">
                      <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-md mr-4">
                        {book.image_url ? (
                          <img 
                            src={book.image_url} 
                            alt={book.judul} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://placehold.co/100x150?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">{book.judul}</h3>
                        <p className="text-gray-600">{book.penulis}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-md">
                            {getCategoryName(book.kategori)}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {book.tahun_terbit || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center flex-col justify-center">
                      <div className="text-2xl font-bold text-yellow-500">
                        {book.rating ? book.rating.toFixed(1) : '—'}
                      </div>
                      <div className="flex items-center mt-1">
                        <StarRating rating={book.rating || 0} />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        ({book.ratingCount || 0} {book.ratingCount === 1 ? 'rating' : 'ratings'})
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No rated books found
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RankingPage;
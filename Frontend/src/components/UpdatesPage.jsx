import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const UpdatesPage = () => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, logout } = useAuth();

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

        // Then load the latest books (using terbaru endpoint)
        try {
          const booksResponse = await axios.get('http://localhost:3000/api/buku/terbaru?limit=20');
          setLatestBooks(booksResponse.data);
        } catch (err) {
          console.error("Failed to load latest books:", err);
          
          // Try fallback to regular books sorted by date
          try {
            const fallbackResponse = await axios.get('http://localhost:3000/api/buku');
            // Sort by creation date (assuming there's a createdAt field)
            const sorted = fallbackResponse.data.sort((a, b) => 
              new Date(b.createdAt || b.tanggal_daftar) - new Date(a.createdAt || a.tanggal_daftar)
            );
            setLatestBooks(sorted.slice(0, 20));
          } catch (fallbackError) {
            throw fallbackError;
          }
        }
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Could not load latest books");
      } finally {
        setLoading(false);
      }
    };

    // Call the function to load data
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

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Latest Updates</h1>
            <div className="text-gray-600">
              {loading ? 
                "Loading..." : 
                `${latestBooks.length} ${latestBooks.length === 1 ? 'Book' : 'Books'} Added Recently`
              }
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10 text-gray-500">
              {error}
            </div>
          ) : latestBooks.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No new books have been added recently.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestBooks.map((book) => (
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
                    
                    {/* New badge */}
                    <div className="absolute top-2 left-2 bg-yellow-100 text-yellow-800 rounded-full text-xs px-2 py-1 font-medium z-10">
                      New!
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
          )}
        </div>

        {/* Added date information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">When Books Were Added</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan="4" className="px-6 py-4">
                        <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  latestBooks.map(book => (
                    <tr key={book._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/book/${book._id}`} className="hover:text-blue-600">
                            {book.judul}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{book.penulis}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {getCategoryName(book.kategori)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {book.createdAt ? new Date(book.createdAt).toLocaleDateString() : 'Unknown'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpdatesPage;
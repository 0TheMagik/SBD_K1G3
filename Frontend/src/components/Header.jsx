import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  // Removed isSearchOpen and setIsSearchOpen props
  currentUser, 
  logout 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full border-b">
      <div className="mx-auto px-4 sm:px-8 py-4 w-full">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-cyan-950 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/" className="text-2xl sm:text-3xl font-bold text-cyan-800">SBD Library</Link>
          </div>
          
          {/* Desktop Navigation and User Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <Link to="/updates" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Updates</Link>
              <Link to="/ranking" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Ranking</Link>
              {currentUser && (
                <Link to="/history" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">History</Link>
              )}
              <Link to="/about-us" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">About Us</Link>
            </nav>
            
            {/* Desktop User Menu */}
            <div className="flex items-center">
              {currentUser ? (
                <div 
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center space-x-1 text-cyan-800 hover:text-cyan-600 py-2 px-3">
                    <span className="font-medium">{currentUser.nama?.split(' ')[0] || 'User'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div 
                    className={`absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 transition-all duration-300 ${
                      dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                    <button 
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-cyan-600 hover:text-cyan-800">Login</Link>
                  <Link to="/register" className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700">Register</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu - Only Authentication Controls */}
          <div className="md:hidden flex items-center">
            {currentUser ? (
              <div className="flex items-center">
                <Link to="/profile" className="text-cyan-950 p-2 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
                <button 
                  onClick={logout}
                  className="text-cyan-950 p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-cyan-600 font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
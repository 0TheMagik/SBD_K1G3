import React from 'react';

const Header = ({ isSidebarOpen, setIsSidebarOpen, isSearchOpen, setIsSearchOpen }) => {
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
            <h1 className="text-2xl sm:text-3xl font-bold text-cyan-800">Lorem</h1>
          </div>
          
          {/* Desktop Navigation and Search */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Updates</a>
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Featured</a>
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Ranking</a>
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Creator</a>
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">Favorited</a>
              <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 transition-colors text-lg px-3 py-2">About Us</a>
            </nav>
            
            {/* Desktop Search - Always Visible */}
            <div className="relative w-48">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 text-sm"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Mobile Search - Icon Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-cyan-950 p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Appears when clicked */}
        {isSearchOpen && (
          <div className="md:hidden mt-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                autoFocus
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-2.5 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

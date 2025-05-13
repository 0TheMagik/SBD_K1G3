import React, { useState } from "react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out border-r border-gray-200`}>
        <div className="p-4 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-2 mt-4">
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">Updates</a>
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">Featured</a>
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">Ranking</a>
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">Creator</a>
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">Favorited</a>
            <a href="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-100 transition-colors text-lg px-3 py-2 rounded">About Us</a>
          </nav>
        </div>
      </div>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Tags Section */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
            </div>
            <div className="border-b-2 border-purple-200 w-24 mb-6"></div>
          </div>

          {/* The most popular */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Grid Item 1 */}
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

              {/* Grid Item 2 */}
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

              {/* Grid Item 3 */}
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

          {/* Recomendation */}

          {/* Recommendation Grid */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended Stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/FF5733/FFFFFF?text=Story+1" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">The Last Kingdom</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/33FF57/FFFFFF?text=Story+2" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Moonlight Shadows</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/3357FF/FFFFFF?text=Story+3" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Dragon's Heart</h3>
              </div>

              {/* Row 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/FF33A8/FFFFFF?text=Story+4" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Silent Whispers</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/33FFF5/FFFFFF?text=Story+5" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Ocean's Fury</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/F5FF33/FFFFFF?text=Story+6" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Golden Sands</h3>
              </div>

              {/* Row 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/8A2BE2/FFFFFF?text=Story+7" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Midnight Tales</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/FF7F50/FFFFFF?text=Story+8" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Crimson Winter</h3>
              </div>

              <div className="group cursor-pointer">
                <div className="aspect-[2/3] overflow-hidden rounded-lg mb-3">
                  <img 
                    src="https://via.placeholder.com/200x300/6495ED/FFFFFF?text=Story+9" 
                    alt="Story Cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">Starlight Journey</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-6">
        <div className="flex flex-wrap gap-2 mb-4">
        </div>
        
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl text-black font-bold mb-4">Genre</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Romance</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Fantasy</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Sci-Fi</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Horror</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Mystery</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Thriller</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Comedy</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Inspiratif</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Sejarah</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Psikologi</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Family</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Adventure</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Slice of Life</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Drama</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Supernatural</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Action</a></li>
            </ul>
          </div>

          {/* Recent Updates */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl text-black font-bold mb-4">Update Terbaru</h2>
            <ul className="space-y-3">
              {[
                "Something"
              ].map((update, index) => (
                <li key={index} className="border-b pb-2 last:border-b-0">
                  <a href="#" className="hover:text-blue-600 text-sm">{update}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
      {/* Footer */}
      <footer className="sticky top-0 z-50 bg-black shadow-md w-full border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-center sm:text-5xl font-bold text-gray-300">About Us</h1>
          <p className="text-center text-gray-300">© 2023 Lorem. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
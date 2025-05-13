import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PopularStories from './components/PopularStories';
import RecommendedStories from './components/RecommendedStories';
import Genre from './components/Genre';
import UpdateTerbaru from './components/UpdateTerbaru';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
        
        <div className="flex-1">
          {/* Tags Section */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4"></div>
            <div className="border-b-2 border-purple-200 w-24 mb-6"></div>
          </div>

          <PopularStories />
          <RecommendedStories />
        </div>

        {/* Sidebar */}
        <aside className="w-full md:w-80 space-y-6">
          <div className="flex flex-wrap gap-2 mb-4"></div>
          <Genre />
          <UpdateTerbaru />
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isSidebarOpen, currentUser }) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out border-r border-gray-200`}>
      <div className="p-4 h-full overflow-y-auto">
        <div className="mb-8">
          <Link to="/" className="text-2xl font-bold text-cyan-800">SBD Library</Link>
        </div>
        <nav className="flex flex-col space-y-2">
          <Link to="/updates" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">Updates</Link>
          <Link to="/ranking" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">Ranking</Link>
          <Link to="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">Creator</Link>
          <Link to="#" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">Favorited</Link>
          {currentUser && (
            <Link to="/history" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">History</Link>
          )}
          <Link to="/about-us" className="font-medium text-cyan-950 hover:text-blue-600 hover:bg-gray-50 transition-colors text-lg px-3 py-2 rounded">About Us</Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
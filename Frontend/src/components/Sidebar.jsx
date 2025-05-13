import React from 'react';

const Sidebar = ({ isSidebarOpen }) => {
  return (
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
  );
};

export default Sidebar;

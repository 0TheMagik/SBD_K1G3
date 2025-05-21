import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PopularStories from './components/PopularStories';
import RecommendedStories from './components/RecommendedStories';
import Genre from './components/Genre';
import UpdateTerbaru from './components/UpdateTerbaru';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Home page component
const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { currentUser, logout } = useAuth();

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

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
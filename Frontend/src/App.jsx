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
import PetugasDashboard from './components/Petugas/PetugasDashboard';
import AdminLogin from './components/Petugas/PetugasLogin';
import PetugasRegister from './components/Petugas/PetugasRegister';
import CategoryPage from './components/CategoryPage';
import AvailableBooks from "./components/AvailableBooks";
import AvailableBooksPage from "./components/AvailableBooksPage";
import BookDetailPage from "./components/BookDetailPage";
import UpdatesPage from "./components/UpdatesPage";
import RatingPage from "./components/BookRatingPage";
import RankingPage from "./components/RankingPage";
import HistoryPage from "./components/History";
import AboutUsPage from "./components/AboutUsPage";

// Protected route component
const ProtectedRoute = ({ children, requiredRole = 'any' }) => {
  const { currentUser, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole !== 'any') {
    const hasRequiredRole = 
      (requiredRole === 'admin' && currentUser.role === 'admin') ||
      (requiredRole === 'staff' && ['admin', 'petugas'].includes(currentUser.role)) ||
      (requiredRole === 'member' && currentUser.role === 'member');
      
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }
  
  return children;
};

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

          {/* Add the AvailableBooks component here, before PopularStories */}
          <AvailableBooks />
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

// Unauthorized page component
const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 mb-6">You don't have permission to access this page.</p>
      <a href="/" className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
        Go to Homepage
      </a>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/admin-register" element={<PetugasRegister />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/available-books" element={<AvailableBooksPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        {/* Protected routes */}
        <Route 
          path="/petugas/*" 
          element={
            <ProtectedRoute requiredRole="staff">
              <PetugasDashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/" 
          element={<HomePage />} 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute requiredRole="member">
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/rating/:id" 
          element={
            <ProtectedRoute requiredRole="member">
              <RatingPage />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/history" 
          element={
            <ProtectedRoute requiredRole="member">
              <HistoryPage />
            </ProtectedRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;

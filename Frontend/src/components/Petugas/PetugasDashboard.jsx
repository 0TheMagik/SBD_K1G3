// ...existing imports...
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BookManagement from './BookManagement';
import MemberManagement from './MemberManagement';
import PetugasManagement from './PetugasManagement';
import RentalManagement from './RentalManagement';
import KategoriManagement from './KategoriManagement';
import CommentManagement from './CommentManagement';

const PetugasDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books');
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-cyan-700 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Perpustakaan Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span>Selamat Datang, {currentUser?.nama || currentUser?.username || 'Petugas'}</span>
            <span className="bg-cyan-800 px-2 py-1 rounded text-xs">
              Petugas
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mt-4">
          <span className="block sm:inline">{notification}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3" 
            onClick={() => setNotification('')}
          >
            <span className="text-green-500">&times;</span>
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 bottom-0 right-0 px-4 py-3" 
            onClick={() => setError('')}
          >
            <span className="text-red-500">&times;</span>
          </button>
        </div>
      )}

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'books' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('books')}
            >
              Kelola Buku
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'kategori' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('kategori')}
            >
              Kelola Kategori
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'members' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('members')}
            >
              Anggota
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'rentals' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('rentals')}
            >
              Peminjaman
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'staff' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('staff')}
            >
              Kelola Petugas
            </button>
            <button
              className={`px-6 py-3 font-medium ${
                activeTab === 'comments' 
                ? 'border-b-2 border-cyan-600 text-cyan-600' 
                : 'text-gray-600 hover:text-cyan-600'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Kelola Komentar
            </button>
          </div>

          {/* Tab content */}
          <div className="p-4">
            {activeTab === 'books' && (
              <BookManagement setError={setError} setNotification={setNotification} />
            )}
            {activeTab === 'kategori' && (
              <KategoriManagement setError={setError} setNotification={setNotification} />
            )}
            {activeTab === 'members' && (
              <MemberManagement setError={setError} setNotification={setNotification} />
            )}
            {activeTab === 'rentals' && (
              <RentalManagement setError={setError} setNotification={setNotification} />
            )}
            {activeTab === 'staff' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Kelola Petugas</h3>
                <PetugasManagement setError={setError} setNotification={setNotification} />
              </div>
            )}
            {activeTab === 'comments' && (
              <div>
                <h3 className="text-lg font-bold mb-4">Kelola Komentar</h3>
                <CommentManagement setError={setError} setNotification={setNotification} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetugasDashboard;

 import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const AboutUsPage = () => {
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

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div className="container mx-auto py-8 px-4">
        {/* About SBD Library Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">About SBD Library</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                SBD Library is an innovative digital library management system developed as a project for the Database System course. 
                Our platform aims to modernize the way libraries manage their collections and how users interact with books.
              </p>
              <p className="text-gray-600 mb-4">
                With SBD Library, users can browse books, check availability, borrow books online, and provide ratings and reviews. 
                The system provides an intuitive interface for both library members and staff, making library management more efficient and user-friendly.
              </p>
              <p className="text-gray-600">
                Our mission is to make knowledge more accessible to everyone through a seamless digital library experience.
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-cyan-600 rounded-lg transform translate-x-3 translate-y-3"></div>
                <div className="relative bg-white p-6 rounded-lg shadow-lg border-2 border-cyan-600">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      User ratings and reviews
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Book borrowing system
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Staff management dashboard
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-cyan-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Category-based organization
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Background */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Background</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 border-l-4 border-cyan-500">
            <p className="italic text-gray-600">
              "SBD Library was developed as our group project for the Database Systems course at our university. 
              This project demonstrates our understanding of database design, API development, user authentication, 
              and creating a complete full-stack application with React and Node.js."
            </p>
          </div>
          
          <p className="text-gray-600 mb-4">
            The project incorporates various database concepts including:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-800 mb-2">Relational Database Design</h4>
              <p className="text-sm text-gray-600">
                Well-structured MongoDB collections with proper relationships between entities like books, users, and borrowing records.
              </p>
            </div>
            
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-800 mb-2">Query Optimization</h4>
              <p className="text-sm text-gray-600">
                Efficient database queries for retrieving books, managing user data, and handling borrowing operations.
              </p>
            </div>
            
            <div className="bg-cyan-50 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-800 mb-2">Authentication & Authorization</h4>
              <p className="text-sm text-gray-600">
                Secure user authentication system with different permission levels for members and staff.
              </p>
            </div>
          </div>
          
          <p className="text-gray-600">
            We hope that SBD Library showcases our understanding of database systems and web development, 
            as well as our ability to create a useful and user-friendly application.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
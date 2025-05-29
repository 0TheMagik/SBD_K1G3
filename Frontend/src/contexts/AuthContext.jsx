import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Fix the JSON.parse error by safely parsing localStorage value
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('user');
  });

  useEffect(() => {
    // When currentUser changes, update localStorage and isAuthenticated
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Also clear token
      setIsAuthenticated(false);
    }
  }, [currentUser]);

  // Regular user login - Updated with correct endpoint
  const login = async (email, password) => {
    try {
      // According to the backend API endpoints in index.js, we should use /api/auth
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });
      
      // Store the token separately if provided
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setCurrentUser(response.data.user || response.data);
      return { success: true, user: response.data.user || response.data };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during login'
      };
    }
  };

  // Staff login method
  const staffLogin = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/login', {
        username,
        password
      });
      
      // Store the token separately
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      const userData = {
        ...response.data.user,
        isStaff: true // Flag to identify staff users
      };
      
      setCurrentUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Staff login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during login'
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // According to the backend API endpoints, should be /api/anggota for registration
      const response = await axios.post('http://localhost:3000/api/anggota', userData);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during registration'
      };
    }
  };

  // Staff register function
  const staffRegister = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/admin/register', userData);
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Staff registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'An error occurred during registration'
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < (Date.now() / 1000);
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  };

  // Check if current user is staff
  const isStaff = () => {
    if (!currentUser) return false;
    return currentUser.isStaff || currentUser.role === 'admin' || currentUser.role === 'petugas';
  };

  // Provide auth context value
  const value = {
    currentUser,
    isAuthenticated,
    login,
    staffLogin,
    register,
    staffRegister,
    logout,
    setCurrentUser,
    isStaff: isStaff()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
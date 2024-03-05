import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [uniqueId, setUniqueId] = useState('');

  useEffect(() => {
    // On component mount, check if authentication data exists in localStorage
    const storedUniqueId = localStorage.getItem('unique_id');
    const storedUsername = localStorage.getItem('username');

    if (storedUniqueId && storedUsername) {
      setUniqueId(storedUniqueId);
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username, uniqueId) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUniqueId(uniqueId);

    // Save authentication data to localStorage upon login
    localStorage.setItem('unique_id', uniqueId);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUniqueId('');

    // Remove authentication data from localStorage upon logout
    localStorage.removeItem('unique_id');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username, uniqueId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

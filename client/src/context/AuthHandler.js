// AuthHandler.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { useAuth } from './AuthContext';

const AuthHandler = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn === 'true' && !isAuthenticated) {
      navigate('/login'); // Use navigate inside useEffect
    }
  }, [isAuthenticated, navigate]);

  return null; // Không render gì ra ngoài
};

export default AuthHandler;

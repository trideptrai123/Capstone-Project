import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../slice/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default PrivateRoute;

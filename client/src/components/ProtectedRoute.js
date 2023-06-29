import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'; // Import the JWT decoding library

const ProtectedRoute = ({ children }) => {
  let token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' />;
  }

  // Decode the JWT token
  try {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert current time to seconds

    if (decodedToken.exp < currentTime) {
      // Token has expired, redirect to login screen
      return <Navigate to='/login' />;
    }
  } catch (error) {
    // Error while decoding token, redirect to login screen
    return <Navigate to='/login' />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;

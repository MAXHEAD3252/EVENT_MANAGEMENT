import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, roles, ...rest }) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("auth"));
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const userRole = isAuthenticated.role;

  if (!roles.includes(userRole)) {
    return <Navigate to="/spinner" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;

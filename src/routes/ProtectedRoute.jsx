import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from require_login() in config/permissions.php
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return <Loader />;
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

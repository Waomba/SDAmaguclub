import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from require_admin()/require_super_admin() in config/permissions.php
export default function AdminRoute({ superOnly = false, children }) {
  const { isAdmin, isSuperAdmin, loading } = useAuth();
  if (loading) return <Loader />;
  if (superOnly ? !isSuperAdmin : !isAdmin) return <Navigate to="/login" replace />;
  return children;
}

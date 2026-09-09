import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService.js';
import { ROLE_ADMIN, ROLE_SUPER_ADMIN } from '../utils/constants.js';

// Mirrors is_logged_in()/is_admin()/is_super_admin() from config/permissions.php,
// backed by the API's session cookie instead of PHP's $_SESSION.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await authService.me();
      setUser(data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    setUser(data.user);
    return data.user;
  };

  const register = async (fields) => {
    const data = await authService.register(fields);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isLoggedIn: !!user,
    isAdmin: !!user && (user.role === ROLE_ADMIN || user.role === ROLE_SUPER_ADMIN),
    isSuperAdmin: !!user && user.role === ROLE_SUPER_ADMIN,
    login,
    register,
    logout,
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

// Ported from includes/auth.php + admin/login.php + community/register.php
import { api } from './api.js';

export const authService = {
  me: () => api.get('/auth/me'),
  login: (username, password) => api.post('/auth/login', { username, password }),
  logout: () => api.post('/auth/logout'),
  register: ({ username, displayName, password, confirmPassword }) =>
    api.post('/auth/register', { username, displayName, password, confirmPassword }),
};

// Ported from pages/settings.php, pages/pathfinders.php, pages/website.php,
// pages/sabbath_times.php, admin/settings/*.php
import { api } from './api.js';

export const settingsService = {
  theme: () => api.get('/settings/theme'),
  setTheme: (theme) => api.post('/settings/theme', { theme }),

  pathfinders: () => api.get('/settings/pathfinders'),
  updatePathfinders: (content) => api.post('/settings/pathfinders', { content }),

  website: () => api.get('/settings/website'),
  updateWebsite: (content) => api.post('/settings/website', { content }),

  sabbathTimes: (lat, lng) => api.get(`/settings/sabbath-times${lat ? `?lat=${lat}&lng=${lng}` : ''}`),

  users: () => api.get('/settings/users'),
  createUser: (user) => api.post('/settings/users', user),
  changeUserRole: (id, role) => api.put(`/settings/users/${id}/role`, { role }),
  deleteUser: (id) => api.del(`/settings/users/${id}`),
};

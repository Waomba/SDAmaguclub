// Ported from admin/dashboard.php's stat tiles
import { api } from './api.js';

export const adminService = {
  stats: () => api.get('/admin/stats'),
};

// Ported from pages/find_church.php, pages/church_profile.php
import { api } from './api.js';

export const churchService = {
  profile: () => api.get('/church/profile'),
  updateProfile: (formData) => api.postForm('/church/profile', formData), // FormData incl. optional logo file
  others: () => api.get('/church/directory'),
  addOther: (church) => api.post('/church/directory', church),
  removeOther: (id) => api.del(`/church/directory/${id}`),
};

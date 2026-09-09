// Ported from pages/gallery.php
import { api } from './api.js';

export const galleryService = {
  list: () => api.get('/gallery'),
  upload: (formData) => api.postForm('/gallery', formData), // FormData: image, caption?, album?
  remove: (id) => api.del(`/gallery/${id}`),
};

// Ported from pages/events.php, pages/event-details.php, api/events/*.php
import { api } from './api.js';

export const eventService = {
  list: () => api.get('/events'),
  get: (id) => api.get(`/events/${id}`),
  create: (event) => api.post('/events', event),
  remove: (id) => api.del(`/events/${id}`),
  participate: (id, { fullName, phone }) => api.post(`/events/${id}/participate`, { fullName, phone }),
};

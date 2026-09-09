// Ported from pages/connect_pastor.php, admin/pastor/*.php
import { api } from './api.js';

export const pastorService = {
  list: () => api.get('/pastor/contacts'),
  create: (contact) => api.post('/pastor/contacts', contact),
  remove: (id) => api.del(`/pastor/contacts/${id}`),
  sendMessage: (pastorId, { senderName, senderContact, message }) =>
    api.post(`/pastor/contacts/${pastorId}/messages`, { senderName, senderContact, message }),
  inboxMessages: () => api.get('/pastor/messages'),
};

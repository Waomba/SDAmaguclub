// Ported from pages/members.php, pages/member-profile.php, api/members/*.php
import { api } from './api.js';

export const memberService = {
  list: (q = '') => api.get(`/members${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  get: (id) => api.get(`/members/${id}`),
  create: (member) => api.post('/members', member),
  update: (id, member) => api.put(`/members/${id}`, member),
  remove: (id) => api.del(`/members/${id}`),
  search: (q) => api.get(`/members/search?q=${encodeURIComponent(q)}`),
};

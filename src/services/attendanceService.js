// Ported from pages/attendance.php, pages/attendance-details.php, admin/attendance/*.php
import { api } from './api.js';

export const attendanceService = {
  byEvent: () => api.get('/attendance/events'), // club-wide per-event rates
  eventDetail: (eventId) => api.get(`/attendance/events/${eventId}`),
  forMember: (memberId) => api.get(`/attendance/members/${memberId}`),
  record: (eventId, rows) => api.post('/attendance/record', { eventId, rows }), // rows: [{memberId, status}]
  update: (eventId, rows) => api.put('/attendance/update', { eventId, rows }),
  statistics: () => api.get('/attendance/statistics'),
};

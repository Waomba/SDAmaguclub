import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils.js';

// Ported from the per-event card in pages/attendance.php's listing
export default function AttendanceCard({ event }) {
  const rate = event.total_count > 0 ? Math.round((event.present_count / event.total_count) * 100) : 0;
  return (
    <Link to={`/attendance/${event.id}`} className="card" style={{ display: 'block' }}>
      <div style={{ fontWeight: 700 }}>{event.title}</div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
        {formatDate(event.event_datetime)} &middot; {event.present_count}/{event.total_count} present ({rate}%)
      </div>
      <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${rate}%` }} /></div>
    </Link>
  );
}

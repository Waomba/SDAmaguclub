import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateUtils.js';

// Ported from the "next event" card in pages/dashboard.php
export default function UpcomingEvents({ event }) {
  if (!event) return null;
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>NEXT EVENT</div>
        <div style={{ fontWeight: 700, marginTop: 4 }}>{event.title}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{formatDateTime(event.event_datetime)} — {event.location}</div>
      </div>
      <Link to={`/events/${event.id}`} className="btn btn-sm">View</Link>
    </div>
  );
}

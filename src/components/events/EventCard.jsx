import React from 'react';
import { Link } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateUtils.js';

// Ported from the per-event card in pages/events.php's listing
export default function EventCard({ event, isPast }) {
  return (
    <div className="card" style={{ opacity: isPast ? .55 : 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
      <Link to={`/events/${event.id}`} style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{event.title}</div>
        <div style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600, margin: '2px 0' }}>{formatDateTime(event.event_datetime)}</div>
        {event.location && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 {event.location}</div>}
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
          {event.participant_count} participant{event.participant_count === 1 ? '' : 's'}
        </div>
      </Link>
    </div>
  );
}

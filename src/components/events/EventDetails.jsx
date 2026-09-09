import React from 'react';

// Ported from the info card in pages/event-details.php
export default function EventDetails({ event, formattedDateTime }) {
  return (
    <div className="card">
      <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{formattedDateTime}</div>
      {event.location && <div>📍 {event.location}</div>}
      {event.description && <p style={{ marginTop: 10, whiteSpace: 'pre-wrap' }}>{event.description}</p>}
    </div>
  );
}

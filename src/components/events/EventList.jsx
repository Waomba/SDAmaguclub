import React from 'react';
import EventCard from './EventCard.jsx';
import EmptyState from '../common/EmptyState.jsx';

// Ported from pages/events.php's listing loop
export default function EventList({ events, isAdmin, onDelete }) {
  if (!events.length) return <EmptyState emoji="📅">No events yet{isAdmin ? ' — add the first one below.' : '.'}</EmptyState>;
  const now = new Date();
  return (
    <>
      {events.map((e) => (
        <div key={e.id} style={{ position: 'relative' }}>
          <EventCard event={e} isPast={new Date(e.event_datetime) < now} />
          {isAdmin && (
            <button
              className="btn btn-sm btn-danger"
              style={{ position: 'absolute', top: 12, right: 12 }}
              onClick={() => { if (confirm('Delete this event?')) onDelete(e.id); }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </>
  );
}

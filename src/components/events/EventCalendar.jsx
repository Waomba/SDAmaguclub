import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/dateUtils.js';

// A simple month-grouped view; the original PHP app listed events chronologically
// without a calendar grid, so this groups the same data by month for a calendar-style browse.
export default function EventCalendar({ events }) {
  const byMonth = events.reduce((acc, e) => {
    const key = new Date(e.event_datetime).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    (acc[key] = acc[key] || []).push(e);
    return acc;
  }, {});
  return (
    <>
      {Object.entries(byMonth).map(([month, items]) => (
        <div key={month} style={{ marginBottom: 20 }}>
          <h3>{month}</h3>
          {items.map((e) => (
            <Link key={e.id} to={`/events/${e.id}`} className="list-item" style={{ display: 'flex' }}>
              <span>{e.title}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{formatDate(e.event_datetime)}</span>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

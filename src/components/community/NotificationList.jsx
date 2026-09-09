import React from 'react';
import { timeAgo } from '../../utils/helpers.js';
import EmptyState from '../common/EmptyState.jsx';

// Ported from community/notifications.php's listing
export default function NotificationList({ notifications }) {
  if (!notifications.length) return <EmptyState emoji="🔔">No notifications yet.</EmptyState>;
  return (
    <div className="card notif-list">
      {notifications.map((n) => (
        <a key={n.id} className="notif-item" href={n.link || '#'}>
          {n.message}
          <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{timeAgo(n.created_at)}</div>
        </a>
      ))}
    </div>
  );
}

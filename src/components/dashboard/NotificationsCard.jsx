import React from 'react';
import { timeAgo } from '../../utils/helpers.js';

// Compact notification preview, used on pages/notifications.php list rendering
export default function NotificationsCard({ notification }) {
  return (
    <a className="notif-item" href={notification.link || '#'}>
      {notification.message}
      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{timeAgo(notification.created_at)}</div>
    </a>
  );
}

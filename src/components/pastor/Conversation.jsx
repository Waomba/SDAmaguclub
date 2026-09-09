import React from 'react';
import { timeAgo } from '../../utils/helpers.js';

// Ported from admin/pastor/messages.php's inbox row rendering
export default function Conversation({ message }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <b>{message.sender_name}</b>
        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{timeAgo(message.created_at)}</span>
      </div>
      {message.sender_contact && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{message.sender_contact}</div>}
      <p style={{ marginTop: 8 }}>{message.message}</p>
    </div>
  );
}

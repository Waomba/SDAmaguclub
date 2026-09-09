import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from '../../utils/helpers.js';
import EmptyState from '../common/EmptyState.jsx';

// Ported from the conversation list in community/messages.php
export default function MessageList({ conversations }) {
  if (!conversations.length) return <EmptyState emoji="✉️">No conversations yet.</EmptyState>;
  return (
    <>
      {conversations.map((c) => (
        <Link key={c.other_id} to={`/community/messages/${c.other_id}`} className="list-item" style={{ display: 'block' }}>
          <b>{c.display_name}</b>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{truncate(c.last_body, 60)}</div>
        </Link>
      ))}
    </>
  );
}

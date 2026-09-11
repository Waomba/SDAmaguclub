import React from 'react';
import { Link } from 'react-router-dom';
import { truncate, timeAgo, initials } from '../../utils/helpers.js';
import EmptyState from '../common/EmptyState.jsx';

// Ported from the conversation list in community/messages.php — restyled as
// a WhatsApp-style chat list row (avatar, name, last-message preview, time).
export default function MessageList({ conversations }) {
  if (!conversations.length) return <EmptyState emoji="✉️">No conversations yet.</EmptyState>;
  return (
    <>
      {conversations.map((c) => (
        <Link key={c.other_id} to={`/community/messages/${c.other_id}`} className="chat-list-item">
          <span className="chat-avatar">{initials(c.display_name)}</span>
          <span className="chat-info">
            <span className="chat-name">{c.display_name}</span>
            <span className="chat-preview">{truncate(c.last_body, 60)}</span>
          </span>
          {c.last_at && <span className="chat-meta-col"><span className="chat-meta-time">{timeAgo(c.last_at)}</span></span>}
        </Link>
      ))}
    </>
  );
}

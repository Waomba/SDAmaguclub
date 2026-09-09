import React from 'react';
import { timeAgo } from '../../utils/helpers.js';

// Ported from the `.chat-window` bubble rendering in community/chat.php and community/group.php
export default function ChatWindow({ messages, currentUserId, showSenderName }) {
  return (
    <div className="chat-window">
      {messages.length === 0 && <p className="page-subtitle">No messages yet — say hello!</p>}
      {messages.map((m) => {
        const mine = m.sender_id === currentUserId;
        return (
          <div key={m.id} className={`chat-bubble ${mine ? 'mine' : 'theirs'}`}>
            {showSenderName && !mine && <b>{m.display_name}: </b>}
            {m.body}
            <span className="chat-meta">{timeAgo(m.created_at)}</span>
          </div>
        );
      })}
    </div>
  );
}

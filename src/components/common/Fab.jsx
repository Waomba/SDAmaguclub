import React from 'react';

// Floating action button — matches the WhatsApp-style green "new chat" button.
// Used on the Groups and Messages screens to create a group / start a chat.
export default function Fab({ onClick, label = 'New' }) {
  return (
    <button className="fab-btn" onClick={onClick} aria-label={label} title={label}>
      <span className="fab-icon">💬</span>
      <span className="fab-plus">+</span>
    </button>
  );
}

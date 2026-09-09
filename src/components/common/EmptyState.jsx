import React from 'react';

// Ported from the repeated `.empty-state` blocks across pages (e.g. "No members found.")
export default function EmptyState({ emoji = '📭', children }) {
  return (
    <div className="empty-state">
      <span className="emoji">{emoji}</span>
      {children}
    </div>
  );
}

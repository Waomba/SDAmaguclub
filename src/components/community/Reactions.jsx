import React from 'react';

// Upvote/downvote bar (replaces the old single "Like" button) — matches the
// vote pill design: separate up/down buttons each with their own count.
export default function Reactions({ upvotes, downvotes, myVote, onVote }) {
  return (
    <div className="vote-group">
      <button
        className={`vote-btn up ${myVote === 'up' ? 'active' : ''}`}
        onClick={() => onVote('up')}
        aria-label="Upvote"
      >
        <span className="vote-arrow">⬆</span> {upvotes}
      </button>
      <button
        className={`vote-btn down ${myVote === 'down' ? 'active' : ''}`}
        onClick={() => onVote('down')}
        aria-label="Downvote"
      >
        <span className="vote-arrow">⬇</span> {downvotes}
      </button>
    </div>
  );
}

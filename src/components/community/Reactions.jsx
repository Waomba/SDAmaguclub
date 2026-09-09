import React from 'react';

// Ported from the reaction toggle form in community/feed.php + community.js's AJAX handler
export default function Reactions({ count, reacted, onToggle }) {
  return (
    <button className={reacted ? 'reacted' : ''} onClick={onToggle}>
      👍 Like ({count})
    </button>
  );
}

import React, { useState } from 'react';

// Ported from the comment thread + composer in community/feed.php
export default function Comments({ comments, isLoggedIn, onAddComment, inputId }) {
  const [text, setText] = useState('');
  return (
    <div className="comment-list">
      {comments.map((c) => (
        <div key={c.id} className="comment-item"><b>{c.display_name}:</b> {c.content}</div>
      ))}
      {isLoggedIn && (
        <form
          style={{ display: 'flex', gap: 6, marginTop: 6 }}
          onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onAddComment(text); setText(''); } }}
        >
          <input id={inputId} type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment…" style={{ flex: 1 }} />
          <button type="submit" className="btn btn-sm">Send</button>
        </form>
      )}
    </div>
  );
}

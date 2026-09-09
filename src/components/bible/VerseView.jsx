import React from 'react';
import EmptyState from '../common/EmptyState.jsx';

// Ported from pages/bible_reader.php's verse rendering + pages/bible_search.php's result rows
export default function VerseView({ verses, mode = 'reader' }) {
  if (!verses.length) {
    return (
      <EmptyState emoji="📖">
        No verse text loaded for this chapter yet.<br />
        Import database/migrations/bible_full.sql to fill this in.
      </EmptyState>
    );
  }
  if (mode === 'search') {
    return (
      <>
        {verses.map((v) => (
          <div key={v.id} className="list-item" style={{ display: 'block' }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--accent)' }}>{v.book_name} {v.chapter}:{v.verse}</div>
            <div style={{ fontSize: 14, marginTop: 4 }}>{v.text}</div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="card reader-text">
      {verses.map((v) => (
        <span key={v.id} className="verse-card"><sup className="verse-num">{v.verse}</sup>{v.text} </span>
      ))}
    </div>
  );
}

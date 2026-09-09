import React from 'react';

// Ported from the "verse of the day" block in pages/dashboard.php
export default function VerseOfDay({ verse }) {
  if (!verse) return null;
  return (
    <div className="card sabbath-hero" style={{ textAlign: 'left' }}>
      <div style={{ fontSize: 12, opacity: .85, fontWeight: 700, letterSpacing: '.05em' }}>VERSE OF THE DAY</div>
      <div style={{ fontSize: 17, lineHeight: 1.6, margin: '10px 0' }}>&ldquo;{verse.text}&rdquo;</div>
      <div style={{ fontSize: 13, fontWeight: 700 }}>{verse.book_name} {verse.chapter}:{verse.verse}</div>
    </div>
  );
}

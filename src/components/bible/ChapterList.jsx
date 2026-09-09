import React from 'react';
import { Link } from 'react-router-dom';

// Ported from pages/bible_chapters.php's chapter grid (faded = no verse text loaded yet)
export default function ChapterList({ book, loadedChapters }) {
  const chapters = Array.from({ length: book.chapter_count }, (_, i) => i + 1);
  return (
    <>
      <div className="page-title">{book.name}</div>
      <div className="page-subtitle">{book.chapter_count} chapters &middot; {book.testament === 'OT' ? 'Old Testament' : 'New Testament'}</div>
      <div className="chapter-grid">
        {chapters.map((c) => (
          <Link
            key={c}
            className="chapter-chip"
            style={{ opacity: loadedChapters.includes(c) ? 1 : .45 }}
            to={`/bible/${book.id}/${c}`}
          >
            {c}
          </Link>
        ))}
      </div>
      <p className="page-subtitle" style={{ marginTop: 16 }}>
        Faded chapters don't have text loaded yet — import database/migrations/bible_full.sql for the complete KJV.
      </p>
    </>
  );
}

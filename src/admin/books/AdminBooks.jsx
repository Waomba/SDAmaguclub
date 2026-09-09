import React from 'react';
import { Link } from 'react-router-dom';

// Ported from admin/books/AdminBooks.php landing screen
export default function AdminBooks() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Books &amp; Bible</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="feature-grid">
        <Link to="/admin/books/library" className="feature-card"><span className="emoji">📚</span><span className="label">Library</span></Link>
      </div>
      <p className="page-subtitle" style={{ marginTop: 12 }}>
        Bible text is managed by importing database/migrations/bible_full.sql directly — there's no per-verse editor.
      </p>
    </>
  );
}

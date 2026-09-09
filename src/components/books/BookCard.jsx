import React from 'react';
import { Link } from 'react-router-dom';

// Ported from the book grid item in pages/books_library.php
export default function BookCard({ book, isAdmin, onDelete }) {
  return (
    <div className="feature-card" style={{ position: 'relative', textAlign: 'left' }}>
      <Link to={`/books/${book.id}`}>
        <span className="emoji">📘</span>
        <div className="label">{book.title}</div>
        {book.author && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{book.author}</div>}
      </Link>
      {isAdmin && (
        <button
          className="btn btn-sm btn-danger"
          style={{ position: 'absolute', top: 6, right: 6 }}
          onClick={() => { if (confirm('Delete this book?')) onDelete(book.id); }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

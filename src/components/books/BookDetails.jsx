import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState.jsx';

// Ported from pages/book_chapters.php's chapter list for a single book
export default function BookDetails({ book, chapters }) {
  return (
    <>
      <div className="page-title">{book.title}</div>
      {book.author && <div className="page-subtitle">by {book.author}</div>}
      {book.description && <p>{book.description}</p>}
      <h3>Chapters</h3>
      {chapters.length === 0 ? (
        <EmptyState emoji="📄">No chapters added yet.</EmptyState>
      ) : (
        chapters.map((c) => (
          <Link key={c.id} to={`/books/chapter/${c.id}`} className="list-item" style={{ display: 'block' }}>
            {c.chapter_number}. {c.title}
          </Link>
        ))
      )}
    </>
  );
}

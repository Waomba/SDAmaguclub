import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../common/EmptyState.jsx';

// Ported from pages/bible_books.php's OT/NT grouped grid
export default function BibleBooks({ books }) {
  if (!books.length) return <EmptyState emoji="📖">No Bible books loaded yet.</EmptyState>;
  const ot = books.filter((b) => b.testament === 'OT');
  const nt = books.filter((b) => b.testament === 'NT');
  return (
    <>
      <h3>Old Testament</h3>
      <div className="book-grid">
        {ot.map((b) => <Link key={b.id} className="book-chip" to={`/bible/${b.id}`}>{b.name}</Link>)}
      </div>
      <h3>New Testament</h3>
      <div className="book-grid">
        {nt.map((b) => <Link key={b.id} className="book-chip" to={`/bible/${b.id}`}>{b.name}</Link>)}
      </div>
    </>
  );
}

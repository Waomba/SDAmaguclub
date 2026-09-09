import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../../services/bookService.js';
import BookCard from '../../components/books/BookCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/books/Library.php
export default function Library() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', author: '', description: '' });

  const load = () => bookService.list().then((d) => setBooks(d.books || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => { e.preventDefault(); await bookService.create(form); setForm({ title: '', author: '', description: '' }); load(); };
  const handleDelete = async (id) => { await bookService.remove(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Library</div>
        <Link to="/admin/books" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {books.length === 0 ? <EmptyState emoji="📚">No books yet.</EmptyState> : (
        <div className="feature-grid">{books.map((b) => <BookCard key={b.id} book={b} isAdmin onDelete={handleDelete} />)}</div>
      )}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Add a book</h3>
        <form onSubmit={handleAdd}>
          <label>Title</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <label>Author</label>
          <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          <label>Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button type="submit" className="btn btn-block">Add Book</button>
        </form>
      </div>
    </>
  );
}

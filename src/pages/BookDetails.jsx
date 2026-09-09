import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService.js';
import BookDetailsView from '../components/books/BookDetails.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/book_chapters.php
export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([bookService.list(), bookService.chapters(id)])
      .then(([books, ch]) => {
        setBook((books.books || []).find((b) => String(b.id) === String(id)));
        setChapters(ch.chapters || []);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!book) return <p>Book not found.</p>;

  return (
    <>
      <button className="btn btn-sm btn-secondary" onClick={() => navigate('/books')} style={{ marginBottom: 12 }}>&larr; Library</button>
      <BookDetailsView book={book} chapters={chapters} />
    </>
  );
}

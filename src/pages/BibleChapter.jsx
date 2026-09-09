import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { bibleService } from '../services/bibleService.js';
import ChapterList from '../components/bible/ChapterList.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/bible_chapters.php (chapter-index view when no chapter is selected)
export default function BibleChapter() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loadedChapters, setLoadedChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    bibleService.book(bookId).then((d) => {
      setBook(d.book);
      setLoadedChapters(d.loadedChapters || []);
    }).finally(() => setLoading(false));
  }, [bookId]);

  if (loading) return <Loader />;
  if (!book) return <p>Book not found.</p>;

  return (
    <>
      <button className="btn btn-sm btn-secondary" onClick={() => navigate('/bible')} style={{ marginBottom: 12 }}>&larr; Books</button>
      <ChapterList book={book} loadedChapters={loadedChapters} />
    </>
  );
}

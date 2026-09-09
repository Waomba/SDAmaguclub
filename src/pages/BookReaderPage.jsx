import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../services/bookService.js';
import BookReader from '../components/books/BookReader.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/book_reader.php
export default function BookReaderPage() {
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bookService.chapter(chapterId).then((d) => setChapter(d.chapter)).finally(() => setLoading(false));
  }, [chapterId]);

  if (loading) return <Loader />;
  if (!chapter) return <p>Chapter not found.</p>;

  return (
    <>
      <button className="btn btn-sm btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>&larr; Back</button>
      <BookReader chapter={chapter} />
    </>
  );
}

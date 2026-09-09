import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bibleService } from '../services/bibleService.js';
import BibleBooksList from '../components/bible/BibleBooks.jsx';
import SearchBar from '../components/common/SearchBar.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/bible_books.php
export default function BibleBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    bibleService.books().then((d) => setBooks(d.books || [])).finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Bible</div>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={(q) => navigate(`/bible/search?q=${encodeURIComponent(q)}`)}
        placeholder="Search verses…"
      />
      <BibleBooksList books={books} />
    </>
  );
}

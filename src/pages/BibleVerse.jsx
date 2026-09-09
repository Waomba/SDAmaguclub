import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { bibleService } from '../services/bibleService.js';
import VerseView from '../components/bible/VerseView.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/bible_reader.php (single chapter reading view) and
// pages/bible_search.php (search results view, when ?q= is present)
export default function BibleVerse() {
  const { bookId, chapter } = useParams();
  const [params] = useSearchParams();
  const q = params.get('q');
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (q) {
      bibleService.search(q).then((d) => { setBook(null); setVerses(d.verses || []); }).finally(() => setLoading(false));
    } else {
      bibleService.chapter(bookId, chapter).then((d) => { setBook(d.book); setVerses(d.verses || []); }).finally(() => setLoading(false));
    }
  }, [bookId, chapter, q]);

  if (loading) return <Loader />;

  return (
    <>
      <button className="btn btn-sm btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>&larr; Back</button>
      <div className="page-title">{q ? `Results for "${q}"` : `${book?.name} ${chapter}`}</div>
      <VerseView verses={verses} mode={q ? 'search' : 'reader'} />
    </>
  );
}

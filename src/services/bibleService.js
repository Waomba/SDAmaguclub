// Ported from pages/bible_books.php, pages/bible_chapters.php, pages/bible_reader.php, pages/bible_search.php
import { api } from './api.js';

export const bibleService = {
  books: () => api.get('/bible/books'),
  book: (bookId) => api.get(`/bible/books/${bookId}`),
  chapter: (bookId, chapter) => api.get(`/bible/books/${bookId}/chapters/${chapter}`),
  search: (q) => api.get(`/bible/search?q=${encodeURIComponent(q)}`),
};

// Ported from pages/books_library.php, pages/book_chapters.php, pages/book_reader.php
import { api } from './api.js';

export const bookService = {
  list: () => api.get('/books'),
  create: (book) => api.post('/books', book),
  remove: (id) => api.del(`/books/${id}`),
  chapters: (bookId) => api.get(`/books/${bookId}/chapters`),
  addChapter: (bookId, chapter) => api.post(`/books/${bookId}/chapters`, chapter),
  chapter: (chapterId) => api.get(`/books/chapters/${chapterId}`),
  updateChapter: (chapterId, chapter) => api.put(`/books/chapters/${chapterId}`, chapter),
};

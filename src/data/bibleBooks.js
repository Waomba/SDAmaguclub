// The actual book/chapter/verse data lives in the bible_books/bible_verses
// tables (seeded from database/churchweb.sql + database/migrations/bible_full.sql)
// and is fetched via bibleService. This file just holds display labels used
// in pages/bible_books.php's OT/NT grouping.
export const TESTAMENT_LABELS = {
  OT: 'Old Testament',
  NT: 'New Testament',
};

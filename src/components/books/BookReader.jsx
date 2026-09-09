import React from 'react';

// Ported from pages/book_reader.php's text rendering
export default function BookReader({ chapter }) {
  return (
    <>
      <div className="page-title">{chapter.title}</div>
      <div className="card reader-text">{chapter.content}</div>
    </>
  );
}

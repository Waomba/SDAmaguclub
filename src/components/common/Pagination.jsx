import React from 'react';

// The original PHP app didn't paginate any list (members, events, etc. all
// rendered in full); this is a lightweight client-side pager for when a
// list gets long, following the same simple/no-frills UI as the rest of the app.
export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="section-header">
      <button className="btn btn-sm btn-secondary" disabled={page <= 1} onClick={() => onChange(page - 1)}>&larr; Prev</button>
      <span className="page-subtitle" style={{ margin: 0 }}>Page {page} of {totalPages}</span>
      <button className="btn btn-sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next &rarr;</button>
    </div>
  );
}

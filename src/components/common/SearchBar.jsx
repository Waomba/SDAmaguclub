import React from 'react';

// Ported from the `.search-box` form used in pages/members.php and pages/bible_search.php
export default function SearchBar({ value, onChange, onSubmit, placeholder = 'Search…' }) {
  return (
    <form
      className="search-box"
      onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); }}
    >
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      <button className="btn" type="submit">Search</button>
    </form>
  );
}

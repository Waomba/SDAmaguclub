import React from 'react';
import SearchBar from '../common/SearchBar.jsx';

// Ported from the filter box in pages/find_church.php
export default function ChurchSearch({ query, onQueryChange, onSearch }) {
  return <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} placeholder="Search churches by name or area…" />;
}

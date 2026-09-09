import React from 'react';
import SearchBar from '../common/SearchBar.jsx';

// Ported from pages/members.php's <form method="get"> search box
export default function MemberSearch({ query, onQueryChange, onSearch }) {
  return <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} placeholder="Search members…" />;
}

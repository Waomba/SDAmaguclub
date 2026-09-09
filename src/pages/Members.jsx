import React, { useState } from 'react';
import { useMembers } from '../hooks/useMembers.js';
import MemberList from '../components/members/MemberList.jsx';
import MemberSearch from '../components/members/MemberSearch.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { Link } from 'react-router-dom';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/members.php
export default function Members() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const { members, loading } = useMembers(submittedQuery);
  const { isAdmin } = useAuth();

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Members</div>
        {isAdmin && <Link to="/admin/members" className="btn btn-sm">Manage</Link>}
      </div>
      <MemberSearch query={query} onQueryChange={setQuery} onSearch={setSubmittedQuery} />
      {loading ? <Loader /> : <MemberList members={members} />}
    </>
  );
}

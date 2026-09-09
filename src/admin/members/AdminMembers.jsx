import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMembers } from '../../hooks/useMembers.js';
import { memberService } from '../../services/memberService.js';
import MemberSearch from '../../components/members/MemberSearch.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/members/AdminMembers.php index
export default function AdminMembers() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const { members, loading, reload } = useMembers(submittedQuery);
  const [form, setForm] = useState({ full_name: '', phone: '', email: '' });

  const handleAdd = async (e) => {
    e.preventDefault();
    await memberService.create(form);
    setForm({ full_name: '', phone: '', email: '' });
    reload();
  };
  const handleRemove = async (id) => { if (confirm('Remove this member?')) { await memberService.remove(id); reload(); } };

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Manage Members</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <MemberSearch query={query} onQueryChange={setQuery} onSearch={setSubmittedQuery} />
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Add member</h3>
        <form onSubmit={handleAdd}>
          <div className="form-row">
            <div><label>Full name</label><input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required /></div>
            <div><label>Phone</label><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <button type="submit" className="btn btn-block">Add Member</button>
        </form>
      </div>
      {loading ? <Loader /> : members.length === 0 ? <EmptyState emoji="👥">No members found.</EmptyState> : (
        members.map((m) => (
          <div key={m.id} className="list-item">
            <Link to={`/admin/members/${m.id}`}>{m.full_name}</Link>
            <button className="btn btn-sm btn-danger" onClick={() => handleRemove(m.id)}>Remove</button>
          </div>
        ))
      )}
    </>
  );
}

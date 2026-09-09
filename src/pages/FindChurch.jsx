import React, { useEffect, useState } from 'react';
import { churchService } from '../services/churchService.js';
import ChurchCard from '../components/church/ChurchCard.jsx';
import ChurchSearch from '../components/church/ChurchSearch.jsx';
import { useAuth } from '../hooks/useAuth.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/find_church.php
export default function FindChurch() {
  const { isAdmin } = useAuth();
  const [churches, setChurches] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const load = () => churchService.others().then((d) => setChurches(d.churches || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => { await churchService.removeOther(id); load(); };
  const handleAdd = async (e) => {
    e.preventDefault();
    await churchService.addOther(form);
    setForm({ name: '', address: '', phone: '' });
    load();
  };

  const filtered = churches.filter((c) =>
    !query || c.name.toLowerCase().includes(query.toLowerCase()) || (c.address || '').toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Find a Church</div>
      <ChurchSearch query={query} onQueryChange={setQuery} onSearch={setQuery} />
      {filtered.length === 0 ? (
        <EmptyState emoji="📍">No churches found.</EmptyState>
      ) : (
        filtered.map((c) => <ChurchCard key={c.id} church={c} isAdmin={isAdmin} onDelete={handleDelete} />)
      )}
      {isAdmin && (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Add a church</h3>
          <form onSubmit={handleAdd}>
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label>Address</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <button type="submit" className="btn btn-block">Add</button>
          </form>
        </div>
      )}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { churchService } from '../../services/churchService.js';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/churches/AdminChurches.php
export default function AdminChurches() {
  const [churches, setChurches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  const load = () => churchService.others().then((d) => setChurches(d.churches || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleAdd = async (e) => { e.preventDefault(); await churchService.addOther(form); setForm({ name: '', address: '', phone: '' }); load(); };
  const handleDelete = async (id) => { await churchService.removeOther(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Churches Directory</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {churches.length === 0 ? <EmptyState emoji="📍">No churches added yet.</EmptyState> : churches.map((c) => (
        <div key={c.id} className="list-item">
          <Link to={`/admin/churches/${c.id}`}>{c.name}</Link>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(c.id)}>Remove</button>
        </div>
      ))}
      <div className="card" style={{ marginTop: 16 }}>
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
    </>
  );
}

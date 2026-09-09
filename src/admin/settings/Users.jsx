import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { settingsService } from '../../services/settingsService.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/settings/Users.php (super-admin only)
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: '', displayName: '', password: '', role: 'admin' });

  const load = () => settingsService.users().then((d) => setUsers(d.users || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await settingsService.createUser(form);
    setForm({ username: '', displayName: '', password: '', role: 'admin' });
    load();
  };
  const handleRoleChange = async (id, role) => { await settingsService.changeUserRole(id, role); load(); };
  const handleDelete = async (id) => { if (confirm('Delete this user?')) { await settingsService.deleteUser(id); load(); } };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Users</div>
        <Link to="/admin/settings" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {users.map((u) => (
        <div key={u.id} className="list-item">
          <span>{u.display_name} <span className="role-pill">{u.role}</span></span>
          <span style={{ display: 'flex', gap: 6 }}>
            <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Remove</button>
          </span>
        </div>
      ))}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Create user</h3>
        <form onSubmit={handleCreate}>
          <div className="form-row">
            <div><label>Display name</label><input type="text" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} required /></div>
            <div><label>Username</label><input type="text" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required /></div>
          </div>
          <div className="form-row">
            <div><label>Password</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></div>
            <div>
              <label>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-block">Create User</button>
        </form>
      </div>
    </>
  );
}

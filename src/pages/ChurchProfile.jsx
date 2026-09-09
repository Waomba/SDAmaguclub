import React, { useEffect, useState } from 'react';
import { churchService } from '../services/churchService.js';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/church_profile.php
export default function ChurchProfile() {
  const { isAdmin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });
  const [logo, setLogo] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    churchService.profile().then((p) => {
      setProfile(p);
      setForm({ name: p.name || '', address: p.address || '', phone: p.phone || '' });
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (logo) formData.append('logo', logo);
    try {
      const updated = await churchService.updateProfile(formData);
      setProfile(updated);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Church Profile</div>
      {isAdmin ? (
        <div className="card">
          <form onSubmit={handleSave}>
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <label>Address</label>
            <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <label>Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <label>Logo</label>
            <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0] || null)} />
            <button type="submit" className="btn btn-block" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </form>
        </div>
      ) : (
        <div className="card">
          {profile?.logo_url && <img src={profile.logo_url} alt="logo" className="avatar-circle" />}
          <h3 style={{ textAlign: 'center' }}>{profile?.name}</h3>
          <p>{profile?.address}</p>
          {profile?.phone && <p>📞 {profile.phone}</p>}
        </div>
      )}
    </>
  );
}

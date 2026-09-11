import React, { useEffect, useState } from 'react';
import { churchService } from '../services/churchService.js';
import ChurchCard from '../components/church/ChurchCard.jsx';
import ChurchSearch from '../components/church/ChurchSearch.jsx';
import ChurchMap from '../components/church/ChurchMap.jsx';
import { useAuth } from '../hooks/useAuth.js';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/find_church.php
export default function FindChurch() {
  const { isAdmin } = useAuth();
  const [profile, setProfile] = useState(null);
  const [churches, setChurches] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', address: '', phone: '', service_times: '', latitude: '', longitude: '' });

  const load = (search = '') => Promise.all([churchService.profile(), churchService.others(search)])
    .then(([churchProfile, directory]) => {
      setProfile(churchProfile);
      setChurches(directory.churches || []);
    })
    .finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleSearch = (value) => {
    const search = value.trim();
    setQuery(search);
    load(search);
  };
  const handleDelete = async (id) => { await churchService.removeOther(id); load(query); };
  const handleAdd = async (e) => {
    e.preventDefault();
    await churchService.addOther(form);
    setForm({ name: '', address: '', phone: '', service_times: '', latitude: '', longitude: '' });
    load(query);
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Find Church</div>
      {profile?.name && (
        <>
          <div className="card">
            {profile.logo_url && <img src={profile.logo_url} alt="logo" className="avatar-circle" />}
            <h3 style={{ margin: '0 0 4px', textAlign: 'center' }}>{profile.name}</h3>
            {profile.address && <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: 0 }}>📍 {profile.address}</p>}
            {profile.phone && <p style={{ textAlign: 'center' }}>📞 <a href={`tel:${profile.phone}`}>{profile.phone}</a></p>}
            {(profile.latitude != null && profile.longitude != null || profile.address) && (
              <div className="form-row" style={{ marginTop: 14 }}>
                <a className="btn" href={mapLink(profile, 'directions')} target="_blank" rel="noopener">🧭 Get Directions</a>
                <a className="btn btn-secondary" href={mapLink(profile, 'maps')} target="_blank" rel="noopener">🗺️ Open in Maps</a>
              </div>
            )}
          </div>
          <ChurchMap address={profile.address} latitude={profile.latitude} longitude={profile.longitude} />
        </>
      )}
      <h3>Other SDA Churches</h3>
      <ChurchSearch
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        onSelectPlace={(place) => {
          if (!isAdmin) return;
          setForm((f) => ({
            ...f,
            name: place.name || f.name,
            address: place.address || f.address,
            phone: place.phone || f.phone,
            latitude: place.latitude ?? f.latitude,
            longitude: place.longitude ?? f.longitude,
          }));
        }}
      />
      {churches.length === 0 ? (
        <EmptyState emoji="📍">No churches found.</EmptyState>
      ) : (
        churches.map((c) => <ChurchCard key={c.id} church={c} isAdmin={isAdmin} onDelete={handleDelete} />)
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
            <label>Service times</label>
            <input type="text" value={form.service_times} onChange={(e) => setForm({ ...form, service_times: e.target.value })} placeholder="e.g. Sabbath 9AM" />
            <div className="form-row">
              <div><label>Latitude</label><input type="number" step="any" value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} /></div>
              <div><label>Longitude</label><input type="number" step="any" value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} /></div>
            </div>
            <button type="submit" className="btn btn-block">Add</button>
          </form>
        </div>
      )}
    </>
  );
}

function mapLink(church, type) {
  const destination = church.latitude != null && church.longitude != null
    ? `${church.latitude},${church.longitude}`
    : church.address;
  const base = type === 'directions' ? 'https://www.google.com/maps/dir/?api=1&destination=' : 'https://www.google.com/maps/search/?api=1&query=';
  return `${base}${encodeURIComponent(destination)}`;
}

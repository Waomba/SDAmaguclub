import React from 'react';

// Ported from the directory row in pages/find_church.php
export default function ChurchCard({ church, isAdmin, onDelete }) {
  const mapsUrl = getMapsUrl(church);

  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <a href={mapsUrl} target="_blank" rel="noopener" style={{ fontWeight: 700 }}>{church.name}</a>
        {church.address && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>📍 <a href={mapsUrl} target="_blank" rel="noopener">{church.address}</a></div>}
        {church.service_times && <div style={{ fontSize: 13 }}>🕑 {church.service_times}</div>}
        {church.phone && <div style={{ fontSize: 13 }}>📞 <a href={`tel:${church.phone}`}>{church.phone}</a></div>}
        <a className="btn btn-sm btn-secondary" href={mapsUrl} target="_blank" rel="noopener" style={{ marginTop: 10 }}>🗺️ Open in Google Maps</a>
      </div>
      {isAdmin && (
        <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Remove this church?')) onDelete(church.id); }}>✕</button>
      )}
    </div>
  );
}

function getMapsUrl(church) {
  const location = church.latitude != null && church.longitude != null
    ? `${church.latitude},${church.longitude}`
    : [church.name, church.address].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

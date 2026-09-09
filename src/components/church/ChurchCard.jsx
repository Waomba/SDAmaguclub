import React from 'react';

// Ported from the directory row in pages/find_church.php
export default function ChurchCard({ church, isAdmin, onDelete }) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontWeight: 700 }}>{church.name}</div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{church.address}</div>
        {church.phone && <div style={{ fontSize: 13 }}>📞 {church.phone}</div>}
      </div>
      {isAdmin && (
        <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Remove this church?')) onDelete(church.id); }}>✕</button>
      )}
    </div>
  );
}

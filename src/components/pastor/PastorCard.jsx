import React from 'react';

// Ported from the contact card in pages/connect_pastor.php
export default function PastorCard({ pastor, isAdmin, onDelete, children }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{pastor.name}</div>
          {pastor.role && <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{pastor.role}</div>}
          <div style={{ marginTop: 6, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            {pastor.phone && <a className="btn btn-sm btn-secondary" href={`tel:${pastor.phone}`}>📞 Call</a>}
            {pastor.phone && (
              <a className="btn btn-sm btn-secondary" href={`https://wa.me/${pastor.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
            )}
            {pastor.email && <a className="btn btn-sm btn-secondary" href={`mailto:${pastor.email}`}>✉️ Email</a>}
          </div>
        </div>
        {isAdmin && (
          <button className="btn btn-sm btn-danger" onClick={() => { if (confirm('Remove this contact?')) onDelete(pastor.id); }}>✕</button>
        )}
      </div>
      {children}
    </div>
  );
}

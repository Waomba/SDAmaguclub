import React from 'react';
import { Link } from 'react-router-dom';

// Ported from admin/gallery/AdminGallery.php landing screen
export default function AdminGallery() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Gallery</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="feature-grid">
        <Link to="/admin/gallery/albums" className="feature-card"><span className="emoji">🗂️</span><span className="label">Albums</span></Link>
        <Link to="/admin/gallery/media" className="feature-card"><span className="emoji">🖼️</span><span className="label">All Media</span></Link>
      </div>
    </>
  );
}

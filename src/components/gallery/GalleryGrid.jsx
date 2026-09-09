import React from 'react';
import EmptyState from '../common/EmptyState.jsx';

// Ported from the `.gallery-grid` rendering loop in pages/gallery.php
export default function GalleryGrid({ images, isAdmin, onDelete }) {
  if (!images.length) return <EmptyState emoji="🖼️">No photos yet.</EmptyState>;
  return (
    <div className="gallery-grid">
      {images.map((img) => (
        <div key={img.id} className="gallery-item">
          <img src={img.url} alt={img.caption || ''} loading="lazy" />
          {isAdmin && (
            <button className="del-btn" onClick={() => { if (confirm('Delete this photo?')) onDelete(img.id); }}>✕</button>
          )}
          {img.caption && <div className="gallery-caption">{img.caption}</div>}
        </div>
      ))}
    </div>
  );
}

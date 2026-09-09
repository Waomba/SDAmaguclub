import React from 'react';

// The original app grouped gallery images by a free-text `album` field but
// rendered them in one flat grid; this card is for an album-first browsing view.
export default function AlbumCard({ album, coverUrl, count, onClick }) {
  return (
    <div className="gallery-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      {coverUrl && <img src={coverUrl} alt={album} loading="lazy" />}
      <div className="gallery-caption">{album || 'Uncategorized'} ({count})</div>
    </div>
  );
}

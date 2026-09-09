import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryService } from '../../services/galleryService.js';
import AlbumCard from '../../components/gallery/AlbumCard.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/gallery/Albums.php
export default function Albums() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { galleryService.list().then((d) => setImages(d.images || [])).finally(() => setLoading(false)); }, []);

  if (loading) return <Loader />;

  const albums = {};
  images.forEach((img) => {
    const key = img.album || 'Uncategorized';
    (albums[key] = albums[key] || []).push(img);
  });

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Albums</div>
        <Link to="/admin/gallery" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      {Object.keys(albums).length === 0 ? <EmptyState emoji="🗂️">No photos yet.</EmptyState> : (
        <div className="gallery-grid">
          {Object.entries(albums).map(([name, imgs]) => (
            <AlbumCard key={name} album={name} coverUrl={imgs[0]?.url} count={imgs.length} />
          ))}
        </div>
      )}
    </>
  );
}

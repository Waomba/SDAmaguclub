import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { galleryService } from '../../services/galleryService.js';
import GalleryGrid from '../../components/gallery/GalleryGrid.jsx';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/gallery/Media.php
export default function Media() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => galleryService.list().then((d) => setImages(d.images || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => { await galleryService.remove(id); load(); };

  if (loading) return <Loader />;

  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>All Media</div>
        <Link to="/admin/gallery" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <GalleryGrid images={images} isAdmin onDelete={handleDelete} />
    </>
  );
}

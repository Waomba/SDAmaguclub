import React, { useEffect, useState } from 'react';
import { galleryService } from '../services/galleryService.js';
import GalleryGrid from '../components/gallery/GalleryGrid.jsx';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/gallery.php
export default function Gallery() {
  const { isAdmin } = useAuth();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = () => galleryService.list().then((d) => setImages(d.images || [])).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => { await galleryService.remove(id); load(); };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    try {
      await galleryService.upload(formData);
      setCaption(''); setFile(null);
      load();
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Gallery</div>
      {isAdmin && (
        <div className="card">
          <form onSubmit={handleUpload}>
            <div className="form-row" style={{ alignItems: 'center' }}>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} required />
              <input type="text" placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} />
              <button type="submit" className="btn" disabled={uploading}>{uploading ? 'Uploading…' : 'Upload'}</button>
            </div>
          </form>
        </div>
      )}
      <GalleryGrid images={images} isAdmin={isAdmin} onDelete={handleDelete} />
    </>
  );
}

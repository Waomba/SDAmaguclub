import React from 'react';
import Modal from '../common/Modal.jsx';

// Lightbox for a single gallery image — the original app just linked to the
// raw uploaded file; this keeps the same content in an in-app viewer.
export default function ImageViewer({ image, onClose }) {
  return (
    <Modal open={!!image} onClose={onClose}>
      {image && (
        <>
          <img src={image.url} alt={image.caption || ''} style={{ width: '100%', borderRadius: 10 }} />
          {image.caption && <p style={{ marginTop: 10 }}>{image.caption}</p>}
        </>
      )}
    </Modal>
  );
}

import React from 'react';

// The original app used the browser's native `confirm()` (via `data-confirm`
// attributes + assets/js/app.js) instead of a custom modal. Provided here to
// match the target folder structure for any future dialog needs.
export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.4)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div className="card" style={{ maxWidth: 420, width: '90%' }} onClick={(e) => e.stopPropagation()}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

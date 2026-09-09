import React, { useEffect, useState } from 'react';
import { settingsService } from '../services/settingsService.js';
import { useAuth } from '../hooks/useAuth.js';
import Loader from '../components/common/Loader.jsx';

// Ported from pages/pathfinders.php
export default function Pathfinders() {
  const { isAdmin } = useAuth();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    settingsService.pathfinders().then((d) => setContent(d.content || '')).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await settingsService.updatePathfinders(content); } finally { setSaving(false); }
  };

  if (loading) return <Loader />;

  return (
    <>
      <div className="page-title">Pathfinders</div>
      {isAdmin ? (
        <div className="card">
          <textarea style={{ minHeight: 200 }} value={content} onChange={(e) => setContent(e.target.value)} />
          <button className="btn" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </div>
      ) : (
        <div className="card reader-text">{content || 'No Pathfinders content added yet.'}</div>
      )}
    </>
  );
}

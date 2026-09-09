import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

// Ported from admin/settings/AdminSettings.php landing screen
export default function AdminSettings() {
  const { isSuperAdmin } = useAuth();
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Settings</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="feature-grid">
        {isSuperAdmin && <Link to="/admin/settings/users" className="feature-card"><span className="emoji">👤</span><span className="label">Users</span></Link>}
        {isSuperAdmin && <Link to="/admin/settings/permissions" className="feature-card"><span className="emoji">🔑</span><span className="label">Permissions</span></Link>}
        <Link to="/church-profile" className="feature-card"><span className="emoji">🏛️</span><span className="label">Church Profile</span></Link>
        <Link to="/website" className="feature-card"><span className="emoji">🌐</span><span className="label">Website</span></Link>
        <Link to="/pathfinders" className="feature-card"><span className="emoji">🧭</span><span className="label">Pathfinders</span></Link>
      </div>
    </>
  );
}

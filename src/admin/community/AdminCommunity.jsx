import React from 'react';
import { Link } from 'react-router-dom';

// Ported from admin/community/AdminCommunity.php landing screen
export default function AdminCommunity() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Community</div>
        <Link to="/admin" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="feature-grid">
        <Link to="/admin/community/posts" className="feature-card"><span className="emoji">📝</span><span className="label">Posts</span></Link>
        <Link to="/admin/community/groups" className="feature-card"><span className="emoji">👨‍👩‍👧‍👦</span><span className="label">Groups</span></Link>
        <Link to="/admin/community/reports" className="feature-card"><span className="emoji">🚩</span><span className="label">Reports</span></Link>
        <Link to="/admin/community/moderation" className="feature-card"><span className="emoji">🛡️</span><span className="label">Moderation</span></Link>
      </div>
    </>
  );
}

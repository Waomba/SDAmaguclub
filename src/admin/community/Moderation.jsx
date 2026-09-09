import React from 'react';
import { Link } from 'react-router-dom';

// Ported from admin/community/Moderation.php — links out to the specific
// moderation tools (deleting posts/comments happens inline on Posts.jsx).
export default function Moderation() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Moderation</div>
        <Link to="/admin/community" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="card">
        <p>Manage posts and comments directly from the <Link to="/admin/community/posts">Posts</Link> screen — delete controls appear there for any post or comment.</p>
      </div>
    </>
  );
}

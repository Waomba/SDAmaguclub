import React from 'react';
import { Link } from 'react-router-dom';

// Ported from admin/settings/Permissions.php — the original app used a
// fixed 3-role model (member/admin/super_admin) rather than per-permission
// toggles, so this documents that model instead of a granular editor.
export default function Permissions() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Permissions</div>
        <Link to="/admin/settings" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Roles</h3>
        <p><b>Member</b> — logged-in community member: can post, comment, react, and message.</p>
        <p><b>Admin</b> — everything a member can do, plus access to the Admin Panel: manage members, events, attendance, gallery, budget, and content.</p>
        <p><b>Super Admin</b> — everything an admin can do, plus managing other admin accounts under Users.</p>
      </div>
    </>
  );
}

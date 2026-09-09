import React from 'react';
import { Link } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState.jsx';

// Ported from admin/community/Reports.php — the original schema has no
// content-report table, so this is a placeholder screen ready to be wired
// to one (community_reports) if that feature is added.
export default function Reports() {
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Reports</div>
        <Link to="/admin/community" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <EmptyState emoji="🚩">No reported content.</EmptyState>
    </>
  );
}

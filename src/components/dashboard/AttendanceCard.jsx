import React from 'react';

// Ported from the admin stats strip on pages/dashboard.php ("N members · N upcoming events")
export default function AttendanceCard({ memberCount, upcomingCount }) {
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 700 }}>ADMIN</div>
        <div style={{ fontSize: 14, marginTop: 2 }}>{memberCount} members &middot; {upcomingCount} upcoming event{upcomingCount === 1 ? '' : 's'}</div>
      </div>
      <a href="/admin" className="btn btn-sm btn-secondary">Admin Panel</a>
    </div>
  );
}

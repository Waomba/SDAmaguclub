import React from 'react';
import { Link } from 'react-router-dom';
import AttendanceStatus from './AttendanceStatus.jsx';
import EmptyState from '../common/EmptyState.jsx';

// Ported from the per-member rows in pages/attendance-details.php
export default function AttendanceTable({ rows }) {
  if (!rows.length) return <EmptyState emoji="✅">No attendance recorded for this event yet.</EmptyState>;
  return (
    <>
      {rows.map((r) => (
        <div key={r.id} className="attendance-row">
          <Link to={`/members/${r.member_id}`}>{r.full_name}</Link>
          <AttendanceStatus status={r.status} />
        </div>
      ))}
    </>
  );
}

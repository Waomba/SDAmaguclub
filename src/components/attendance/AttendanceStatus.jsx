import React from 'react';

// Ported from the `.status-present`/`.status-absent` badges used across attendance views
export default function AttendanceStatus({ status }) {
  return (
    <span className={`status-${status}`}>{status === 'present' ? '✓ Present' : '✗ Absent'}</span>
  );
}

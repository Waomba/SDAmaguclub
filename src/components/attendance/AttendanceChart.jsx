import React from 'react';

// Ported from the overall attendance progress bar in pages/member-profile.php
export default function AttendanceChart({ rate }) {
  if (rate === null || rate === undefined) return null;
  return (
    <div className="card">
      <div>Overall attendance: <b>{rate}%</b></div>
      <div className="progress-bar"><div className="progress-bar-fill" style={{ width: `${rate}%` }} /></div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useAttendance } from '../../hooks/useAttendance.js';
import Loader from '../../components/common/Loader.jsx';

// Ported from admin/attendance/AttendanceReports.php
export default function AttendanceReports() {
  const { events, loading } = useAttendance();
  if (loading) return <Loader />;
  const overall = events.length
    ? Math.round(events.reduce((sum, e) => sum + (e.total_count ? e.present_count / e.total_count : 0), 0) / events.length * 100)
    : 0;
  return (
    <>
      <div className="section-header">
        <div className="page-title" style={{ marginBottom: 0 }}>Attendance Reports</div>
        <Link to="/admin/attendance" className="btn btn-sm btn-secondary">Back</Link>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-value">{overall}%</div><div className="stat-label">Average rate</div></div>
        <div className="stat-card"><div className="stat-value">{events.length}</div><div className="stat-label">Events tracked</div></div>
      </div>
      <table>
        <thead><tr><th>Event</th><th>Present</th><th>Total</th><th>Rate</th></tr></thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.present_count}</td>
              <td>{e.total_count}</td>
              <td>{e.total_count ? Math.round((e.present_count / e.total_count) * 100) : 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
